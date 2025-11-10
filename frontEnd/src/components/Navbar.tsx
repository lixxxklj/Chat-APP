import { useAuthStore } from '../store/useAuthStore'

import { Link } from 'react-router-dom'
import { TwitchOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

const Navbar = () => {
  const { authUser, logout } = useAuthStore()

  return (<header 
  className='border-b border-violet-100 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
    <div className='flex items-center justify-between container mx-auto px-4 h-16'>
      {/* left side */}
      <Link to='/' className='text-xl font-bold flex items-center gap-2'>
        <TwitchOutlined style={{ color: '#6d28d9' }} />
        <span className='text-xl font-bold'>Chatty</span>
      </Link>

      {/* right side */}
      <div className='flex items-center gap-4 text-sm font-medium'>
        <Link to='/setting' className='btn btn-sm hover:text-violet-900'>
          <SettingOutlined className='w-5 h-4' />
          <span className='hidden sm:inline'>设置</span>
        </Link>
        {authUser && (
          <>
            <Link to='/profile' className='btn btn-sm hover:text-violet-900'>
              <UserOutlined className='w-5 h-4' />
              <span className='hidden sm:inline'>修改资料</span>
            </Link>
            <div onClick={ logout } className='btn btn-sm hover:text-violet-900'>
              <LogoutOutlined className='w-5 h-4' />
              <span className='hidden sm:inline'>退出</span>
            </div>
          </>
        )}
      </div>
    </div>
  </header>)
}

export default Navbar