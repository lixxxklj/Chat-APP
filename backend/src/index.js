import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import path from 'path'

import { connectDB } from './lib/db.js'

import { app, server } from './lib/socket.js'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json())     // 解析 JSON 请求体
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

// 在生产环境下，express.static 托管 dist（前端打包的index.html + js/css/图片等）
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  // 匹配不到的路由都会回退到index.html页面
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

server.listen(PORT, () => {
  console.log('server is running on port：' + PORT);
  connectDB()
})