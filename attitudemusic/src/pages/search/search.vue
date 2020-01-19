<template>
  <!--搜索-->
  <div class="search">
    <a-spin :spinning='spinning'>
      <div class="search-head">
        <input
          v-model.trim="searchValue"
          class="search-input"
          type="text"
          placeholder="音乐/歌手"
          @keyup.enter="onEnter"
        />
        <template
          v-for="(item,index) in Artists.slice(0,5)"
          
          @click="clickHot(item.first)"
        >      
          <a-tag :key="index" @click="clickHot(item.first)" class='search-tag'>{{item.first}}</a-tag>
        </template>
      </div>
      <div class='search-content'>
        <music-list
          ref="musicList"
          :list="list"
          @selectMusic="selectMusic"
        />
      </div>
    </a-spin>
  </div>
</template>

<script>
import { search, searchHot, getMusicDetail } from 'api'
import MusicList from 'components/music-list/music-list'
import formatSongs from '@/utils/song'
import { getFavoriteSong } from "api/favorite";
import Cookie from 'js-cookie'
export default {
  name: "Search",
  components: {
    MusicList
  },
  data() {
    return {
      searchValue: '', // 搜索关键词
      Artists: [], // 热搜数组
      list: [], // 搜索数组
      page: 0, // 分页
      lockUp: true, // 是否锁定上拉加载事件,默认锁定
      spinning: false,
      idList: [],
      videoSrc: ''
    }
  },
  activated() {
    this.spinning = true;
    // 获取热搜
    searchHot().then(res => {
      if (res.data.code === 200) {
        this.Artists = res.data.result.hots
      }
      this.spinning = false;
    })
  },
  methods: {
    // 点击热搜
    clickHot(name) {
      this.searchValue = name
      this.spinning = true;
      this.onEnter()
    },
    // 搜索事件
    onEnter() {
      if (this.searchValue.replace(/(^\s+)|(\s+$)/g, '') === '') {
        this.$mmToast('搜索内容不能为空！')
        return
      }
      this.spinning = true;
      this.page = 0
      search(this.searchValue).then(res => {
        if (res.data.code === 200) {
          this.list = formatSongs(res.data.result.songs)
          // 判断是否为喜欢的音乐
          this.favoriteSong()
        }
        this.spinning = false;
      })
    },
    // 播放歌曲
    async selectItem(music) {
      let image = await this._getMusicDetail(music.id)
      music.image = image
    },
    // 获取歌曲详情
    _getMusicDetail(id) {
      return getMusicDetail(id).then(res => {
        if (res.data.code === 200) {
          return res.data.songs[0].al.picUrl
        }
      })
    },
    selectMusic(data) {
      const audio = document.getElementById("atmPlayer");
      audio.src = data.url;
      audio.data = data;
      audio.play();
      // 保存到历史播放
      if(this.$store.state.historyList.findIndex((item) => {
        return item.name === data.name
      }) === -1) {
        this.$store.commit('setHistoryList', data);
        Cookie.set("historyList", this.$store.state.historyList);
      }
    },
    async favoriteSong() {
      this.spinning = true;
      // 请求获取最新喜欢音乐id数组
      if(this.$store.state.user.username) {
        const user = this.$store.state.user
        const data = await getFavoriteSong(user)
        if(typeof data.data === 'object') {
          this.idList = data.data.favoriteSong;
          this.list = this.list.filter((item) => {
            this.idList.filter((i) => {
              if(i === item.id) {
                item.like = true;
                this.$set(item,'like', true)
              }
            })
            return item;
          })
          this.spinning = false;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  position: relative;
  width: 1500px;
  margin: 0 auto;
  height: 80vh;
  .search-content {
    height: 75vh;
    overflow: hidden;
  }
  .search-head {
    display: flex;
    height: 80px;
    padding: 10px 15px;
    overflow: hidden;
    .search-tag {
      line-height: 40px;
      margin-left: 15px;
      height: 40px;
      background-color: #C9665C;
      cursor: pointer;
      &:hover {
        color: @attitude_color;
        background-color: #fff;
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid #999;
      outline: 0;
      background: transparent;
      color: #555;
      font-size: @font_size_medium;
      box-shadow: 0 0 1px 0 #fff inset;
      &::placeholder {
        color: #999;
      }
    }
  }
  .musicList {
    width: 100%;
    height: calc(~"100% - 50px");
  }
}
</style>

