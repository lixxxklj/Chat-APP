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

interface AuthState {
  authUser: AuthUser | null
  isSigningUp: boolean
  isLogging: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  checkAuth: () => Promise<void>,
  signUp: (data: RegisterUser, nav: ReturnType<typeof useNavigate>) => Promise<void>,
  login: (data: LoginUser) => Promise<void>,
  logout: () => Promise<void>,
  updateProfile: (data: { profilePic: string }) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,

  isCheckingAuth: false,

  checkAuth: async () => { 
    set({ isCheckingAuth: true })
    try {
      const res = await checkAuthApi()
      set({ authUser: res.data })
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
      const res = await signUpApi(data)
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
      
      // localStorage.setItem('jwt')
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
  }
}))