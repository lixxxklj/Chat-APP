import request from '../lib/request'
import type { RegisterUser, LoginUser } from '../types/user'

export const checkAuth = () => {
  return request.get('/auth/check')
}

export const signUp = (data: RegisterUser) => {
  return request.post('/auth/signup', data)
}

export const login = (data: LoginUser) => {
  return request.post('/auth/login', data)
}

export const logout = () => {
  return request.post('/auth/logout')
}

export const profile = (data: { profilePic: string }) => {
  return request.put('/auth/update-profile', data)
}

export const getUsers = () => {
  return request.get('/message/users')
}

export const getMessages = (id: string | null) => {
  return request.get(`/message/${id}`)
}