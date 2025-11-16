import { 
  checkAuth as checkAuthApi,
  signUp as signUpApi,
  login as loginApi,
  logout as logoutApi,
  profile as profileApi
} from '../api'
import type { RegisterUser, LoginUser, AuthUser } from "../types/user"
import { create } from "zustand"
import toast from 'react-hot-toast'
import type { useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'

interface AuthState {
  authUser: AuthUser | null
  isSigningUp: boolean
  isLogging: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  onlineUsers: string[]
  socket: Socket | null

  checkAuth: () => Promise<void>,
  signUp: (data: RegisterUser, nav: ReturnType<typeof useNavigate>) => Promise<void>,
  login: (data: LoginUser) => Promise<void>,
  logout: () => Promise<void>,
  updateProfile: (data: { profilePic: string }) => Promise<void>,
  connectSocket: () => void,
  disConnectSocket: () => void
}

const BASE_URL: string = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/'

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => { 
    set({ isCheckingAuth: true })
    try {
      const res = await checkAuthApi()
      set({ authUser: res.data })
      get().connectSocket()
    } catch (error) {
      console.log('Error in checkAuth：', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signUp: async (data, nav) => {
    set({ isSigningUp: true })
    try {
      await signUpApi(data)
      toast.success('注册成功，请登录~')
      nav('/login')
    } catch (error) {
      console.log('Error in signup：', error)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLogging: true })
    try {
      const res = await loginApi(data)
      set({ authUser: res.data })
      
      // 登录成功就启动 socket
      get().connectSocket()
    } catch (error) {
      console.log('Error in login', error)
    } finally {
      set({ isLogging: false })
    }
  },

  logout: async () => {
    try {
      await logoutApi()
      set({ authUser: null })
      get().disConnectSocket()
    } catch (error) {
      console.log('Error in logout：', error)
    }
  },
  
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await profileApi(data)
      set({ authUser: res.data })
      toast.success('头像更新成功')
    } catch (error) {
      console.log('Error in updateProfile', error)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  connectSocket: () => {
    const { authUser } = get()
    // 没授权或者已连接
    if(!authUser || get().socket?.connected)  return

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    })
    socket.connect()

    set({ socket })

    // 获取在线的用户
    socket.on('getOnlineUsers', (onlineUsersId) => {set({ onlineUsers: onlineUsersId })})
  },

  disConnectSocket: () => {
    if(get().socket?.connected)  get().socket?.disconnect()
  }
}))