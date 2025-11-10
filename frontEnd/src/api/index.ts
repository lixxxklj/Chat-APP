import request from '../lib/request'
import type { RegisterUser } from '../types/user'

export const checkAuth = () => {
  return request.get('/auth/check')
}

export const signUp = (data: RegisterUser) => {
  return request.post('/auth/signup', data)
}

export const logout = () => {
  return request.post('/auth/logout')
}