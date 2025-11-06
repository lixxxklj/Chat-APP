import { useState } from 'react'
import type { ChangeEvent } from 'react'

const SignUp = () => {
  // 密码是否可查看
  const [showPassword, setShowPassword] = useState(false)
  // 注册表单
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  // 注册中
  const [signup, setSigningUp] = useState(false)

  const validateForm = () => {}
  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  }
  return <div>
    SignUp
  </div>
}

export default SignUp