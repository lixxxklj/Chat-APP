import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import { Toaster } from 'react-hot-toast'

const violet700 = '#6d28d9'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
     theme={{
      token: {
        colorPrimary: violet700,
        colorPrimaryHover: '#581c87'
      }
     }}
    >
      <BrowserRouter>     {/* history 模式 */}
        <App />
        <Toaster position="top-center" />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
