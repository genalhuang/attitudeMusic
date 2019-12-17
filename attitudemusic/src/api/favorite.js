import axios from 'axios'
import { ATMURL } from '@/config'

// 收藏列表
export function postFavoriteList (params) {
  return axios.post(`${ATMURL}/favoriteList`, {
      params
  })
}

// 查询收藏列表
export function getFavoriteList (params) {
  return axios.get(`${ATMURL}/favoriteList`, {
      params
  })
}

// 收藏歌曲
export function favoriteSong (params) {
  return axios.post(`${ATMURL}/login`, {
    params
  })
}