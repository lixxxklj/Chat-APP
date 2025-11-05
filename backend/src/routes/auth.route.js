import express from 'express'
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

// 调用updateProfile之前，需要通过protectRoute校验(是否有合法的token、是否存在该用户)
router.post('/update-profile', protectRoute, updateProfile)

router.post('/check', protectRoute, checkAuth)

export default router