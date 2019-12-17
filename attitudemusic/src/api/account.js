import axios from 'axios'
import { ATMURL } from '@/config'

// 账号注册
export function accountRegister (username, password) {
  return axios.post(`${ATMURL}/register`, {
      username,
      password
  })
}
// 账号登录
export function accountLogin (username, password) {
  return axios.post(`${ATMURL}/login`, {
      username,
      password
  })
}