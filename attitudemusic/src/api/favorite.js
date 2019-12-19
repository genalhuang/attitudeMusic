import axios from 'axios'
import { ATMURL } from '@/config'

// 更新收藏列表
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

// 更新收藏歌曲
export function postFavoriteSong (params) {
  return axios.post(`${ATMURL}/favoriteSong`, {
    params
  })
}

// 查询收藏歌曲
export function getFavoriteSong (params) {
  return axios.get(`${ATMURL}/favoriteSong`, {
    params
  })
}