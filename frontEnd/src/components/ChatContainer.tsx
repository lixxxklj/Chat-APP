import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from './MessageInput'
import MessageSkeleton from "./skeletons/MessageSkeleton"

const ChatContainer = () => {
  const { selectedUser, isMessagesLoading, getMessages, messages } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser?._id || '')
  }, [selectedUser?._id, getMessages])

  return (
    <div className="p-4 h-full flex flex-col">
      <ChatHeader />
      {
        isMessagesLoading ? <MessageSkeleton /> : (
          <div className="flex-1 overflow-y-auto">
            messageContainer
          </div>
        )
      }
      <MessageInput />
    </div>
  )
}

export default ChatContainer