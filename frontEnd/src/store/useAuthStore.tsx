import { 
  checkAuth as checkAuthApi,
  logout as logoutApi,
  signUp as signUpApi
} from '../api'
import type { RegisterUser } from "../types/user"
import { create } from "zustand"

type AuthUser = {
  _id: string,
  fullName: string,
  email: string,
  profilePic: string,
}

interface AuthState {
  authUser: AuthUser | null
  isSigningUp: boolean
  isLogging: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  checkAuth: () => Promise<void>,
  signUp: (data: RegisterUser) => Promise<void>,
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
      console.log('Error in checkAuth：', error)
    } finally {
      set({ isSigningUp: false })
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