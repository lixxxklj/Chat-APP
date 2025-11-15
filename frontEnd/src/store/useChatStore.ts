import { 
  getUsers as getUsersApi,
  getMessages as getMessagesApi,
  sendMessages as sendMessagesAPI
} from '../api/index'
import type { AuthUser } from '../types/user'
import type { MessageData } from '../types/message'

import { create } from "zustand"

interface ChatState {
  messages: any[],
  users: any[],
  selectedUser: AuthUser | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean,

  getUsers: () => Promise<void>,
  getMessages: (userId: string) => Promise<void>,
  setSelectedUser: (user: AuthUser | null) => void,
  sendMessage: (data: MessageData) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
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
      const res = await getMessagesApi(userId)
      set({ messages: res.data })
    } catch (error) {
      console.log('error in getMessages：', error)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  sendMessage: async (data) => {
    const { selectedUser, messages } = get()
    try {
      const res = await sendMessagesAPI(selectedUser?._id || '', data)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      console.log('error in sendMessage：', error)
    }
  }
}))