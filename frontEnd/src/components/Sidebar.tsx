import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { UsergroupDeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Checkbox } from 'antd'

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showOnlineUser, setShowOnlineUsers] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filterUser = showOnlineUser ? 
    users.filter(u => onlineUsers.includes(u._id)) : users

  return (
    <aside className='flex flex-col h-full transition-all duration-1000'>
      {/* header */}
      <div className="p-4">
        <div className='flex items-center gap-2 mb-2'>
          <UsergroupDeleteOutlined style={{ fontSize: 21 }} />
          <span className="text-sm hidden lg:block">联系人</span>
        </div>
        <div className='hidden lg:block transition-1000-ease'>
          <Checkbox onChange={() => setShowOnlineUsers(!showOnlineUser)}>
            显示在线好友<span className='text-gray-400 text-xs'>（{onlineUsers.length - 1} 在线）</span>
          </Checkbox>
        </div>
      </div>
      {/* usersList */}
      {isUsersLoading ? <SidebarSkeleton /> :
        <div className="w-full overflow-y-auto">
          {
            filterUser.map(user => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-3 flex items-center gap-3
                  hover:bg-violet-100 transition-colors
                  ${selectedUser?._id === user._id ? "bg-violet-200" : ""}`
                }
              >
                {/* 头像 + 在线标识 */}
                <div className='relative'>
                  <img 
                    src={user.profilePic || '/avatar.png'} 
                    alt={user.fullName}
                    className='w-10 h-10 object-cover rounded-full'
                  />
                  {
                    onlineUsers.includes(user._id) && (
                      <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full' />
                    )
                  }
                </div>
                {/* 用户名等 */}
                <div className='hidden lg:block text-left'>
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-xs text-zinc-400">
                    {onlineUsers.includes(user._id) ? "在线" : "离线"}
                  </div>
                </div>
              </button>
            ))
          }
        </div>
      }
      {/* 无user的提示 */}
      {filterUser.length === 0 &&(
        <div className='text-center text-gray-400 py-4'>暂无在线联系人</div>
      )}
    </aside>
  )
}
export default Sidebar