import Navbar from "./components/Navbar"

import { useRoutes } from "./router"
import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from "antd"

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore()
  const routes = useRoutes()

  useEffect(() => {
    checkAuth()
  }, [])
  
  if(isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {
          routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))
        }
      </Routes>
    </div>
  )
}

export default App