import { TwitchOutlined } from '@ant-design/icons'

const NoChatSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className='p-2 bg-base-100 rounded-xl mb-4 animate-bounce text-primary'>
        <TwitchOutlined style={{ fontSize: 22 }} />
      </div>
      <span className='text-xl font-bold'>Welcome to Chatty!</span>
      <span className='text-sm text-gray-400 mt-4'>从侧边栏选择一个好友即可开始聊天</span>
    </div>
  )
}
export default NoChatSelected