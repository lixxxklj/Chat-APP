import { 
  getUsers as getUsersApi,
  getMessages as getMessagesApi,
  sendMessages as sendMessagesAPI
} from '../api/index'
import type { AuthUser } from '../types/user'
import type { MessageData } from '../types/message'

import { create } from "zustand"
import { useAuthStore } from './useAuthStore'
import { message } from 'antd'

interface ChatState {
  messages: any[],
  users: any[],
  selectedUser: AuthUser | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean,

  getUsers: () => Promise<void>,
  getMessages: (userId: string) => Promise<void>,
  setSelectedUser: (user: AuthUser | null) => void,
  sendMessage: (data: MessageData) => Promise<void>,
  subscribeToMessage: () => void,
  unsubscribeFromMessage: () => void
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
  },

  // 实时监听接收的信息
  subscribeToMessage: () => {
    const { selectedUser } = get()
    if(!selectedUser) return

    const socket = useAuthStore.getState().socket
    socket?.on('newMessage', (newMessage) => {
      
      // 不是聊天对象发来的消息 ---> 不接收
      if(newMessage.senderId !== selectedUser._id)  return

      set({
        messages: [...get().messages, newMessage]
      }) 
    })
  },

  // 取消订阅（监听）
  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket
    socket?.off('newMessage')
  }
}))