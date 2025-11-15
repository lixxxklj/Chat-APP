import { useAuthStore } from "../store/useAuthStore"
import type { LoginUser } from "../types/user"
import { Form, Input, Button } from "antd"
import { Link } from "react-router-dom"

import { 
  TwitchOutlined, 
  MailOutlined, 
  LockOutlined
} from '@ant-design/icons'

const Login = () => {
  const { isLogging, login } = useAuthStore()

  const handleSubmit = (data: LoginUser) => {
    // console.log(data)
    login(data)
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-96 bg-base-100 shadow-xl p-8 text-center'>
        {/* logo */}
        <div className='flex flex-col items-center justify-center mb-6'>
          <div className='flex justify-center items-center bg-violet-50 p-3 mb-2 rounded-full'>
            <TwitchOutlined style={{ color: '#6d28d9', fontSize: 18 }} />
          </div>
          <span className='text-lg font-bold'>欢迎回来</span>
          <span className='text-sm text-gray-500'>Sign in to your account</span>
        </div>
        {/* 注册表单 */}
        <Form onFinish={handleSubmit} layout='vertical'>
          <Form.Item 
            label="邮箱" 
            name='email'
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' }
            ]}
          >
            <Input placeholder='you@example.com' prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item 
            label="密码" 
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='password' prefix={<LockOutlined />} />
          </Form.Item>
          <Button block type='primary' htmlType='submit' loading={ isLogging }>登录</Button>
        </Form>
        {/* 底部链接 */}
        <div className='text-sm text-gray-500 mt-4'>
          <span>还未注册？去</span>
          <Link to='/signup' className='text-violet-400 mx-1'>创建</Link>账户
        </div>
      </div>
    </div>
  )
}

export default Login