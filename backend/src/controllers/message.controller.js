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
    const senderId = req.user._id 

    const messages = await User.find({ senderId, receiverId: userToChatId })
  } catch (error) {
    console.log('error in getMessages controller：', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}