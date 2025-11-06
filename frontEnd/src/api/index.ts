import request from '../lib/request'

export const checkAuth = () => {
  return request.get('/auth/check')
}