
import axios from 'axios'
import { ATMURL } from '@/config'

// 账号注册
export function accountEnter (account, password) {
  return axios.post(ATMURL + '/enter', {
    params: {
      account,
      password
    }
  })
}