import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

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
        email: newUser.email,
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

export const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: '该邮箱还未注册' })
    }

    const isOk = await bcrypt.compare(password, user.password)
    if (!isOk) {
      return res.status(400).json({ message: '密码错误' })
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email,
      profilePic: user.profilePic
    })
  } catch (error) {
    console.log('error in login controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: '用户登出成功' })
  } catch (error) {
    console.log('error in logout controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateProfile = (req, res) => {
  const { profilePic } = req.body
try {
  const userId = req.user._id
  if(!profilePic)   return res.status(400).json({ message: '上传的图片不可为空' })
  
  const uploadRes = cloudinary.uploader.upload(profilePic, async (err, result) => {
    if(err)  return res.status(500).json({ message: 'cloudinary上传profilePic失败' })
    // 返回更新后的数据
    const upadteUser = await User.findByIdAndUpdate(userId, { profilePic: result.secure_url }, { new: true })
    return res.status(200).json(upadteUser)
  })
} catch (error) {
  console.log('error in updateProfile controller：', error.message);
  res.status(500).json({ message: 'Internal Server Error' })
}}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log('error in checkAuth controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}