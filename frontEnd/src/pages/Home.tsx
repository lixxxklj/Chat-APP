import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import { useChatStore } from '../store/useChatStore'

const Home = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className='w-full h-[calc(100vh-64px)] flex justify-center bg-gray-100'>
      <div className='w-4xl lg:max-w-6xl pt-4 pb-8 px-4'>
        <div className='flex h-full gap-1'>
          {/* left-sidebar */}
          <div className='w-20 lg:w-64 bg-white'>
            <Sidebar />
          </div>
          {/* right-message-containe */}
          <div className='flex-1 bg-white'>
            { selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home