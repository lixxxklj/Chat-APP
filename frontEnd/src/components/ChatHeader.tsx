import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { CloseOutlined } from "@ant-design/icons"

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  return (
    <div className="h-12 w-full flex items-start gap-2">
      <img 
        src={selectedUser?.profilePic || '/avatar.png'} 
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex flex-col flex-1">
        <span className="text-sm font-semibold">{selectedUser?.fullName}</span>
        <span className="text-xs text-gray-400">{onlineUsers.includes(selectedUser?._id || '') ? '在线' : '离线'}</span>
      </div>
      <CloseOutlined 
        style={{color: '#9ca3af', fontSize: '12px'}} 
        onClick={() => setSelectedUser(null)} 
      />
    </div>
  )
}

export default ChatHeader