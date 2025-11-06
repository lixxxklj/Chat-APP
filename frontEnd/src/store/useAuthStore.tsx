import { create } from "zustand";
import { checkAuth as checkAuthApi } from '../api'

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
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => { 
    try {
      const res = await checkAuthApi()
      set({ authUser: res.data })
    } catch (error) {
      console.log('Error in checkAuth：', error);
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  }
}))