import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js'

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: '请完善注册信息' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: '密码至少六位数' })
    }

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: '该邮件已经注册' })
    }

    // const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      fullName,
      password: hashPassword
    })

    if (newUser) {
      // 生成令牌
      const token = generateToken(newUser._id, res)    // _id是MongoDB自动追加的
      // 201 - 已创建
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.em,
        profilePic: newUser.profilePic
      })
    } else {
      return res.status(400).json({ message: '无效的用户数据' })
    }
  } catch (error) {
    console.log('error in signup controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const login = (req, res) => {
  res.send('signup route')
}

export const logout = (req, res) => {
  res.send('signup route')
}