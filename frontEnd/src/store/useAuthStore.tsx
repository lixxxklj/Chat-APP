import { 
  checkAuth as checkAuthApi,
  signUp as signUpApi,
  login as loginApi,
  logout as logoutApi
} from '../api'
import type { RegisterUser, LoginUser, AuthUser } from "../types/user"
import { create } from "zustand"

interface AuthState {
  authUser: AuthUser | null
  isSigningUp: boolean
  isLogging: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  checkAuth: () => Promise<void>,
  signUp: (data: RegisterUser) => Promise<void>,
  login: (data: LoginUser) => Promise<void>,
  logout: () => Promise<void>
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

  signUp: async (data: RegisterUser) => {
    set({ isSigningUp: true })
    try {
      await signUpApi(data)
    } catch (error) {
      console.log('Error in signup：', error)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data: LoginUser) => {
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
  }
}))