<template>
  <!--歌曲列表-->
  <div class="musicList">
    <template v-if="list.length>0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-num"></span>
        <span class="list-artist">歌手</span>
        <span class="list-time">时长</span>
        <span class="list-album">专辑</span>
      </div>
      <div ref="listContent" class="list-content">
        <div v-for="(item,index) in myList" :key="index" class="list-item">
          <span class="list-num" v-text="index+1" />
          <div class="list-name" @click="clickMusic(item)">
            <span>{{ item.name }}</span>
          </div>
          <div class="list-num" @click='_postFavoriteSong(index)'>  
            <img v-if='item.like' class='musicList-img' src="@/assets/img/like.png" alt="">
            <img v-if='!item.like' class='musicList-img' src="@/assets/img/unlike.png" alt="">
          </div>
          <span class="list-artist">{{ item.singer || item.ar[0].name }}</span>
          <span class="list-time" v-if='item.duration'>{{ (item.duration % 3600) | format }}</span>
          <span class="list-album">{{ item.album }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { postFavoriteSong, getFavoriteSong } from 'api/favorite';
import { format } from 'utils/util'
export default {
  name: "MusicList",
  props: {
    // 歌曲数据
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      idList:[],
      myList: this.list
    }
  },
  filters: {
    // 时间格式化
    format
  },
  activated() {
    console.log(this.list)
    this._getFavoriteSong()
  },
  methods: {
    clickMusic(item) {
      this.$emit("selectMusic", item);
    },
    // 回到顶部
    scrollTo() {
      this.$refs.listContent.scrollTop = 0
    },
    async _getFavoriteSong() {
      // 请求获取最新收藏id数组
      if(this.$store.state.user.username) {
        const user = this.$store.state.user
        const data = await getFavoriteSong(user)
        if(typeof data.data === 'object') {
          this.idList = data.data.favoriteSong;
          this.$store.commit('setUserInfo', data.data);
          this.list.filter((item) => {
            if (this.idList.indexOf(item.id) !== -1) {
              this.$set(item,'like', true);
              console.log(item.name)
            } else {
              item.like = false;
            }
          })
        }
      } else {
        this.$message.error('请先登录!')
      }
      this.myList = this.list;
    },
    async _postFavoriteSong(index) {
      const song = this.myList[index];
      const params = {
        ...this.$store.state.user,
        songId: song.id
      }
      const data =  await postFavoriteSong(params)
      if(typeof data === 'object') {
        this.$message.success('歌单更新成功')
        song.like = !song.like
        this.$set(this.myList,index, song)
      } else {
        this.$message.error(data.data)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.musicList {
  width: 1500px;
  margin: 0 auto;
}
.list-header {
  margin-top: 1px solid #fff;
  border-bottom: 1px solid @list_head_line_color;
  color: @attitude_color;
  font-weight: bold;
  background-color: #fff;
  .list-name {
    padding-left: 40px;
    user-select: none;
    border-right: 1px solid #fff;
  }
  .list-artist {
    border-right: 1px solid #fff;
  }
}

.list-content {
  width: 100%;
  height: calc(~"100% - 60px");
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .musicList-img {
    width:100%;

  }
  .list-item:hover {
    background-color: @attitude_color;
    color: #fff;
    .list-name {
      span {
        cursor: pointer;
      }
    }
  }
}

.list-item {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid @list_item_line_color;
  line-height: 50px;
  overflow: hidden;


  &.on {
    color: #fff;

    .list-num {
      font-size: 0;
      background: url("~assets/img/wave.gif") no-repeat center center;
    }
  }

  .list-num {
    display: block;
    width: 30px;
    margin-right: 10px;
    text-align: center;
  }

  .list-name {
    position: relative;
    flex: 1;
    box-sizing: border-box;

    & > span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    small {
      margin-left: 5px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    /*hover菜单*/

    .list-menu {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      height: 40px;
      font-size: 0;
      transform: translateY(-50%);
    }
  }

  .list-artist,
  .list-album {
    display: block;
    width: 300px;
  }

  .list-time {
    display: block;
    width: 60px;
    position: relative;

    .list-menu-icon-del {
      display: none;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
