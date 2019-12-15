// 随机排序数组/洗牌函数 https://github.com/lodash/lodash/blob/master/shuffle.js
function copyArray(source, array) {
  let index = -1
  const length = source.length
  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}

export const randomSortArray = function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

// 防抖函数
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 补0函数
export function addZero(s) {
  return s < 10 ? '0' + s : s
}

// 歌词解析
export function parseLyric(lrc) {
  let lyrics = lrc.split('\n')
  let lrcObj = []
  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i])
    let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    let timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    let clause = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k]
      let min = Number(String(t.match(/\[\d*/i)).slice(1))
      let sec = Number(String(t.match(/:\d*/i)).slice(1))
      let time = min * 60 + sec
      if (clause !== '') {
        lrcObj.push({ time: time, text: clause })
      }
    }
  }
  return lrcObj
}

// 时间格式化
export function format(value) {
  let minute = Math.floor(value / 60)
  let second = Math.floor(value % 60)
  return `${addZero(minute)}:${addZero(second)}`
}


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
