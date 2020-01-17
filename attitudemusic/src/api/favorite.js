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

// 上传mv
export function postVideo (params) {
  return axios.post(`${ATMURL}/video`, params)
}

// 获取mv
export function getVideo (params) {
  return axios.get(`${ATMURL}/video`, {
    responseType:  'arraybuffer',
    params
  })
}

// 删除mv
export function deleteVideo (params) {
  return axios.get(`${ATMURL}/video/delete`, {
    params
  })
}