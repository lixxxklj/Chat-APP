import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from './MessageInput'

const ChatContainer = () => {
  const { selectedUser, isMessagesLoading, getMessages, messages } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser?._id || '')
  }, [selectedUser?._id, getMessages])

  return (
    <div className="p-4">
      <ChatHeader />
      <p>ChatContainer</p>
      <MessageInput />
    </div>
  )
}

export default ChatContainer