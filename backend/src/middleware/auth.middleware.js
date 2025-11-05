import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if(!token)  return res.status(401).json({ message: 'token缺失' })

    // 返回JWT的payload（荷载）部分
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if(!payload) {
      return res.status(401).json({ message: 'token过期' })
    }

    const user = await User.findById(payload.userId).select("-password")
    if(!user)  return res.status(404).json({ message: '用户不存在' })

    req.user = user     // 后续路由可以通过req.user访问用户信息
    next()              // 调用下一个函数
  } catch (error) {
    console.log('error in auth middleware', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}