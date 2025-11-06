import Home from "../pages/Home"
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"
import Setting from "../pages/Setting"
import Profile from "../pages/Profile"

import  { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export const useRoutes = () => {
  const { authUser } = useAuthStore()
  return [
    { path: '/', element: authUser ? <Home /> : <Navigate to='/login' /> },
    { path: '/signup', element: !authUser ? <SignUp /> : <Navigate to='/' /> },
    { path: '/login', element: !authUser ? <Login /> : <Navigate to='/' /> },
    { path: '/setting', element: <Setting /> },
    { path: '/profile', element: authUser ? <Profile /> : <Navigate to='/login' /> },
  ]
}