<template>
  <!--搜索-->
  <div class="search">
    <div class="search-head">
      <span
        v-for="(item,index) in Artists.slice(0,5)"
        :key="index"
        @click="clickHot(item.first)"
      >{{ item.first }}</span>
      <input
        v-model.trim="searchValue"
        class="search-input"
        type="text"
        placeholder="音乐/歌手"
        @keyup.enter="onEnter"
      />
    </div>
    <music-list
      ref="musicList"
      :list="list"
      :list-type="2"
      @selectMusic="selectMusic"
    />
  </div>
</template>

<script>
import { search, searchHot, getMusicDetail } from 'api'
import MusicList from 'components/music-list/music-list'
import formatSongs from '@/utils/song'
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
      lockUp: true // 是否锁定上拉加载事件,默认锁定
    }
  },
  created() {
    // 获取热搜
    searchHot().then(res => {
      if (res.data.code === 200) {
        this.Artists = res.data.result.hots
      }
    })
  },
  methods: {
    // 点击热搜
    clickHot(name) {
      this.searchValue = name
      this.onEnter()
    },
    // 搜索事件
    onEnter() {
      if (this.searchValue.replace(/(^\s+)|(\s+$)/g, '') === '') {
        this.$mmToast('搜索内容不能为空！')
        return
      }
      this.page = 0
      search(this.searchValue).then(res => {
        if (res.data.code === 200) {
          this.list = formatSongs(res.data.result.songs)
        }
      })
    },
    // 滚动加载事件
    pullUpLoad() {
      this.page += 1
      search(this.searchValue, this.page).then(res => {
        if (res.data.code === 200) {
          if (!res.data.result.songs) {
            this.$mmToast('没有更多歌曲啦！')
            return
          }
          this.list = [...this.list, ...formatSongs(res.data.result.songs)]
        }
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
  height: 100%;
  overflow: hidden;
  .search-head {
    display: flex;
    height: 60px;
    padding: 10px 15px;
    overflow: hidden;
    background: @search_bg_coloe;
    span {
      line-height: 40px;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        color: @attitude_color;
      }
      @media (max-width: 640px) {
        & {
          display: none;
        }
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid @btn_color;
      outline: 0;
      background: transparent;
      color: @text_color_active;
      font-size: @font_size_medium;
      box-shadow: 0 0 1px 0 #fff inset;
      &::placeholder {
        color: @text_color;
      }
    }
  }
  .musicList {
    width: 100%;
    height: calc(~"100% - 50px");
  }
}
</style>

