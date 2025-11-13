import { 
  getUsers as getUsersApi,
  getMessages as getMessagesApi,
} from '../api/index'
import type { AuthUser } from '../types/user'

import { create } from "zustand"

interface ChatState {
  messages: any[],
  users: any[],
  selectedUser: AuthUser | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean,

  getUsers: () => Promise<void>
  getMessages: (userId: string | null) => Promise<void>
  setSelectedUser: (user: AuthUser) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const res = await getUsersApi()
      set({ users: res.data })
    } catch (error) {
      console.log('error in getUsers：', error)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true })
    try {
      await getMessagesApi(userId)
    } catch (error) {
      console.log('error in getMessages：', error)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user })
}))