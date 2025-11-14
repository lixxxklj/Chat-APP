import cloudinary from 'cloudinary'
import User from '../models/user.model.js'
import Message from '../models/message.model.js'

export const getUsersForSidebar = async (req, res) => {
  try {
    const loginUserId = req.user._id
    const filtersUsers = await User.find({ _id: { $ne: loginUserId } })
    res.status(200).json(filtersUsers)
  } catch (error) {
    console.log('error in getUsersForSidebar controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const myId = req.user._id 

    // 获取两个用户之间的信息
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    })

    res.status(200).json(messages)
  } catch (error) {
    console.log('error in getMessages controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let imageUrl
    if(image) {
      // 文件二进制或 base64
      await cloudinary.uploader.upload(image)
      imageUrl = result.secure_url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    })
    await newMessage.save()

    // socket.io 实现实时性的聊天

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('error in sendMessage controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}