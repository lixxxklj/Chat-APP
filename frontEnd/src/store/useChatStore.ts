import { create } from "zustand"

interface ChatState {
  messages: any[],
  users: any[],
  selectedUser: string | null,
  setSelectedUser: (id: string | null) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,

  setSelectedUser: () => {}
}))