import { useAuthStore } from '../store/useAuthStore'

import { TwitchOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import type { RegisterUser } from '../types/user'

const SignUp = () => {
  // 注册
  const { isSigningUp, signUp } = useAuthStore()
  // 提交
  const handleSubmit = (values: RegisterUser) => {
    signUp(values)
  }
  return <div className='h-screen flex items-center justify-center'>
    <div className='w-96 bg-base-100 shadow-xl p-8 text-center'>
      {/* logo */}
      <div className='flex flex-col items-center justify-center mb-6'>
        <div className='flex justify-center items-center bg-violet-50 p-3 mb-2 rounded-full'>
          <TwitchOutlined style={{ color: '#6d28d9', fontSize: 18 }} />
        </div>
        <span className='text-lg font-bold'>创建您的帐户</span>
        <span className='text-sm text-gray-500'>Get started with your account</span>
      </div>
      {/* 注册表单 */}
      <Form onFinish={handleSubmit} layout='vertical'>
        <Form.Item 
          label="用户名" 
          name='fullName'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder='full name' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item 
          label="邮箱" 
          name='email'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' }
          ]}
        >
          <Input placeholder='email' prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item 
          label="密码" 
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='password' prefix={<LockOutlined />} />
        </Form.Item>
        <Button block type='primary' htmlType='submit' loading={isSigningUp}>注册</Button>
      </Form>
      {/* 底部链接 */}
      <div className='text-sm text-gray-500 mt-4'>
        <span>已经有账户了？去</span>
        <Link to='/login' className='text-violet-400 ml-1'>登录</Link>
      </div>
    </div>
  </div>
}

export default SignUp