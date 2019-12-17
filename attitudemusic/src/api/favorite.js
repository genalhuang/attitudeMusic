import axios from 'axios'
import { ATMURL } from '@/config'

// 收藏列表
export function favoriteList (params) {
  return axios.post(`${ATMURL}/favorite`, {
      params
  })
}
// 收藏歌曲
export function favoriteSong (params) {
  return axios.post(`${ATMURL}/login`, {
    params
  })
}