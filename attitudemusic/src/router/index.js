import Vue from 'vue'
import Router from 'vue-router'
import miusic from 'pages/music'
import playlist from 'pages/playList/playList'
import userlist from 'pages/userList/userList'
import toplist from 'pages/topList/topList'
import details from 'pages/details/details'
import historyList from 'pages/historyList/historyList'
import search from 'pages/search/search'
import userSong from 'pages/userSong/userSong'
import artist from 'pages/artist/artist'
import video from 'pages/video/video'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    component: miusic,
    redirect: '/music/topList',
    children: [
      {
        path: '/music/playlist', // 正在播放列表
        component: playlist,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/music/userlist', // 我的歌单
        component: userlist,
        meta: {
          title: '我的歌单',
          keepAlive: true
        }
      },
      {
        path: '/music/userSong', // 我的歌单
        component: userSong,
        meta: {
          title: '我喜欢',
          keepAlive: true
        }
      },
      {
        path: '/music/toplist', // 排行榜列表
        component: toplist,
        meta: {
          title: '排行榜',
          keepAlive: true
        }
      },
      {
        path: '/music/details/:id', // 音乐详情列表
        component: details,
        meta: {
          title: '歌单详情',
          keepAlive: false
        }
      },
      {
        path: '/music/historylist', // 我听过的列表
        component: historyList,
        meta: {
          title: '我听过的'
        }
      },
      {
        path: '/music/search', // 搜索
        component: search,
        meta: {
          title: '搜索',
          keepAlive: true
        }
      },
      {
        path: '/music/artist', // 音乐评论
        component: artist,
        meta: {
          title: '歌手列表'
        }
      },
      {
        path: '/music/video', // 音乐评论
        component: video,
        meta: {
          title: '视频列表'
        }
      }
    ]
  }
]

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})
