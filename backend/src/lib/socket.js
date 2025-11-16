import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173']
  }
})

// 存储在线的用户
const userSocketMap = {}   // {userId: socketId}

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId]
}

io.on("connection", (socket) => {
  // 只要一连接，就会触发该回调函数
  console.log('A User connected：', socket.id)

  const userId = socket.handshake.query.userId
  if(userId)  userSocketMap[userId] = socket.id

  // 发送所有在线用户数据的事件
  io.emit('getOnlineUsers', Object.keys(userSocketMap))
  
  socket.on('disconnect', () => {
    console.log('A User disconnected：', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { io, app, server }