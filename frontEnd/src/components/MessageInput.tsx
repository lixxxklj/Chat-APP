import { Input } from "antd"
import { FileImageOutlined, SendOutlined } from "@ant-design/icons"

const MessageInput = () => {
  return (
    // border-solid border-2 border-gray-200
    <div className="h-12 flex gap-4">
      <Input placeholder="请输入... ..." />
      <FileImageOutlined />
      <SendOutlined />
    </div>
  )
}

export default MessageInput