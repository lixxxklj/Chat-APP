import { Skeleton, Space } from 'antd'

const MessageSkeleton = () => {
  const skeletonMessages = Array(5).fill(null)

  return (
    <div className="overflow-y-auto flex-1">
      {skeletonMessages.map((_, idx) => {
        const isMe = idx % 2 === 1 // 1、3、5… 放右边（自己）
        return (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-center',
              justifyContent: isMe ? 'flex-end' : 'flex-start',
            }}
          >
            {/* 头像骨架 - 圆形 */}
            {!isMe && (
              <Skeleton.Avatar active size="default" shape="circle" />
            )}
  
            {/* 气泡 + 昵称骨架 */}
            <Space
              direction="vertical"
              size={4}
              style={{
                marginLeft: isMe ? 0 : 12,
                marginRight: isMe ? 12 : 0,
                maxWidth: 320,
                alignItems: isMe ? 'flex-end' : 'flex-start'
              }}
            >
              {/* 昵称骨架 */}
              <Skeleton.Input
                active
                style={{ width: 40, height: 16 }}
              />
  
              {/* 气泡骨架 - 圆角矩形 */}
              <Skeleton.Input
                active
                style={{
                  width: 200 + (idx % 3) * 30, // 长度略有变化
                  height: 56,
                  borderRadius: 12,
                }}
              />
            </Space>
  
            {/* 自己发的消息头像在右侧 */}
            {isMe && (
              <Skeleton.Avatar active size="default" shape="circle" />
            )}
          </div>
        )})
      }
    </div>
  )
}

export default MessageSkeleton