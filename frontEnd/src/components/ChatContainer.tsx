import { useEffect, useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from './MessageInput'
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { formateTime } from "../utils/formateTime"

const ChatContainer = () => {
  const { selectedUser, isMessagesLoading, getMessages, messages,
    subscribeToMessage, unsubscribeFromMessage
  } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getMessages(selectedUser?._id || '')
    subscribeToMessage()

    // 销毁
    return () => {
      unsubscribeFromMessage()
    }
  }, [selectedUser?._id, getMessages, subscribeToMessage, unsubscribeFromMessage])

  // 每当messages数组变化（新消息进来的时候），就让聊天窗口自动平滑滚动到最底部
  useEffect(() => {
    if(messageEndRef.current && messages) 
      // scrollIntoView({ behavior: 'smooth' }) --->「平滑滚到最底」
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="p-4 h-full flex flex-col">
      <ChatHeader />
      {
        isMessagesLoading ? <MessageSkeleton /> : (
          <div className="flex-1 overflow-y-auto px-1">
            {
              messages.map(msg => {
                const isMe = msg.senderId === authUser?._id
                
                return (
                  <div ref={messageEndRef}>
                    <div className={`text-xs opacity-50 mb-1 mx-8 mt-4 ${isMe ? 'text-right' : 'text-left'}`}>
                      { formateTime(msg.createdAt) }
                    </div>
                    <div 
                      key={msg._id} 
                      className={`flex ${isMe ? 'flex-row-reverse' : ''} gap-2`}
                    >
                      <img src={isMe ? 
                          authUser?.profilePic :
                          selectedUser?.profilePic || '/avatar.png'
                        } 
                        alt="个人头像"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <div className="flex flex-col bg-violet-100/40 justify-center px-2 rounded-md relative">
                        {/* <i className="absolute -left-1 top-2 border-y-6 border-r-6 border-l-0 border-t-transparent 
                          border-b-transparent border-r-violet-100"></i> */}
                        <span className="text-sm mt-1">{ msg.text }</span>
                        {msg.image && <img src={msg.image} className="h-32 w-32" />}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
      <MessageInput />
    </div>
  )
}

export default ChatContainer