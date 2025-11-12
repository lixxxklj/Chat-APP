import axios, { AxiosError } from "axios"
import toast from 'react-hot-toast'

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,       // 携带 Cookie / Authorization
  timeout: 10000
})

instance.interceptors.response.use(
  res => res,
  (err: AxiosError<{ message?: string}>) => {
    if(!err.response) {
      toast.error('网络错误或请求超时')
      return Promise.reject(err)
    }
    const backendMsg = err.response.data?.message
    toast.error(backendMsg || '请求失败')
    return Promise.reject(err)
  }
)
export default instance