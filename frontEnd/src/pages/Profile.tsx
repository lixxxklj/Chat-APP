import { useAuthStore } from "../store/useAuthStore"
import { Form, Input } from "antd"
import { UserOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons'
import type React from "react"
import { useState } from "react"

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectImg, setSelectImg] = useState(authUser?.profilePic || 'avatar.png')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 将用户选的图片转为Base64字符串，然后发给后端更新
    const file = e.target.files?.[0]
    if(!file)  return
    const reader = new FileReader()
    // 将图片变为Data URL格式（后端能解码还原成原始字节流）
    reader.readAsDataURL(file)
    // 成功后的回调
    reader.onload = async () => {
      const base64Image = reader.result as string
      // console.log(base64Image);
      await updateProfile({ profilePic: base64Image })
      setSelectImg(base64Image)
    }
  }
  
  return <div className="flex items-center justify-center h-screen">
    <div className="w-96 bg-base-100 shadow-xl p-8">
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-bold">个人信息</div>
        <div className="text-sm text-gray-700 mb-2">Your profile information</div>
        {/* 隐藏式上传触发 + 预览 */}
        <div className="relative">
          <img 
            src={selectImg} 
            className="size-28 rounded-full object-cover border" 
          />
          <label
            htmlFor="avatar-upload"
            className="absolute w-6 h-6 bg-yellow-400 rounded-full right-4 bottom-0 cursor-pointer flex items-center justify-center"
          >
            <UploadOutlined className="size-3" />
            {/* 隐藏的上传 */}
            <input 
              id="avatar-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <div className="text-xs text-gray-500">{isUpdatingProfile ? 'loading...' : '点击图标更改您的头像'}</div>
      </div>
      <Form 
        layout='vertical' 
        initialValues={{
          fullName: authUser?.fullName,
          email: authUser?.email
        }}
      >
        <Form.Item 
          label={
            <span>
              <UserOutlined className="mr-2" />
              用户名
            </span>
          } 
          name='fullName'
        >
          <Input value={authUser?.fullName} disabled />
        </Form.Item>
        <Form.Item 
          label={
            <span>
              <MailOutlined className="mr-2" />
              邮箱
            </span>
          } 
          name='email'
        >
          <Input value={authUser?.email} disabled />
        </Form.Item>
      </Form>
      <div className="flex flex-col text-sm mt-8">
        <span className="font-bold">账户信息</span>
        <span className="border-b-2 border-gray-100 py-2">加入会员日</span>
        <div className="py-2 flex justify-between">
          账户状态
          <span className="text-green-600">active</span>
        </div>
      </div>
    </div>
  </div>
}

export default Profile