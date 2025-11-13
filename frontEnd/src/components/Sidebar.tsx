import { useChatStore } from '../store/useChatStore'
import { UsergroupDeleteOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import SidebarSkeleton from './skeletons/SidebarSkeleton'

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()

  const onlineUsers:string[] = []

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <aside className='flex flex-col h-full transition-all duration-1000'>
      <div className="flex items-center gap-2">
        <UsergroupDeleteOutlined style={{ fontSize: 21 }} />
        <span className="text-sm hidden lg:block">联系人</span>
      </div>
      {isUsersLoading ? <SidebarSkeleton /> :
        <div className="w-full overflow-y-auto">
          {
            users.map(user => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedUser?._id === user._id} ? "bg-base-300 ring-1 ring-base-300" : ""`
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
                      <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2' />
                    )
                  }
                </div>
                {/* 用户名等 */}
              </button>
            ))
          }
        </div>
      }
    </aside>
  )
}
export default Sidebar