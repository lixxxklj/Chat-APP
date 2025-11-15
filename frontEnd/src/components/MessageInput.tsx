import { useChatStore } from "../store/useChatStore"
import { Button, Input, Upload } from "antd"
import { CloseOutlined, FileImageOutlined, SendOutlined } from "@ant-design/icons"
import { useState, useRef } from "react"
import toast from "react-hot-toast"

const MessageInput = () => {
  const [text, setText] = useState('')
  const [preview, setPreview] = useState('')
  const uploadRef = useRef<any>(null)
  const { messages, sendMessage } = useChatStore()

  const handleUpload = (file: File) => {
    // console.log(file);
    if(!file.type.startsWith("image/")) {
      toast.error('请上传图片格式')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setPreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const removeUpload = () => {
    if(preview)  URL.revokeObjectURL(preview)
    setPreview('')
  }
  const handleSendMessage = async () => {
    if(!text.trim() && !preview)  return
    try {
      await sendMessage({
        text: text.trim(),
        image: preview
      })
      setText('')
      setPreview('')
    } catch (error) {
      console.error("Error in handleSendMessage:", error)
    }
  }
  
  return (
    // border-solid border-2 border-gray-200
    <div className="relative">
      {preview && (
        <div className="absolute bottom-10">
          <div className="relative inline-block">
            <img src={preview} alt="preview" className="rounded-md h-16 w-16 object-cover" />
            <span 
              className="absolute -top-2 -right-2 flex items-center justify-center
                cursor-pointer bg-gray-400 text-white rounded-full px-1 w-5 h-5"
              onClick={removeUpload}
            >
              <CloseOutlined style={{fontSize: '12px'}} />
            </span>
          </div>
        </div>
      )}
      <div className="h-12 flex gap-5 items-center">
        <Input 
          placeholder="请输入... ..."
          value={text}
          onChange={(e) => setText(e.target.value)} 
        />
        {/* 上传图片/文件 */}
        <Upload 
          ref={uploadRef} 
          showUploadList={false}
          beforeUpload={(selected: File) => {
            handleUpload(selected)
            return false
          }}>
          <Button 
            type="link" 
            icon={<FileImageOutlined style={{color: '#000'}}/>}
          />
        </Upload>
        
        {/* 发送信息 */}
        <Button 
          type="link"
          icon={<SendOutlined style={{color: '#6d28d9'}}/>} 
          disabled={!text.trim() && !preview}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default MessageInput