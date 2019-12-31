<template>
  <!--歌单详情-->
  <div class="details">
    <a-spin :spinning='spinning'>
      <div class="details-content">
        <div class="details-left">
          <img class='detials-img' :src="playlist.coverImgUrl || playlist.picUrl" alt />
        </div>
        <div class="details-right">
          <div class="details-text title">{{playlist.name}}</div>
          <div class="details-text">{{playlist.description || playlist.briefDesc}}</div>
          <div class="details-text" v-if='type !== "artist"'>创建时间 : {{playlist.createTime | formatDate}}</div>
          <div class="details-img" @click='changekLike'>
            <img v-if='like' src="@/assets/img/like.png" alt="">
            <img v-if='!like' src="@/assets/img/unlike.png" alt="">
          </div>
        </div>
      </div>
      <div class='details-list'>
        <music-list class='music-list scrollTop' :list="list" @selectMusic="selectMusic" />
      </div>
    </a-spin>
  </div>
</template>

<script>
import { getPlaylistDetail, getArtistSong } from "api";
import { formatTopSongs } from "@/utils/song";
import { format, formatDate } from "@/utils/util";
import MusicList from "components/music-list/music-list.vue";
import { postFavoriteList } from 'api/favorite';
import { getFavoriteSong } from 'api/favorite';
export default {
  name: "Detail",
  components: {
    MusicList
  },
  filters: {
    // 时间格式化
    format,
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  data() {
    return {
      list: [],
      playlist: {},
      like: false,
      listId: 0,
      favoriteList: [],
      spinning: false,
      id: '',
      type:''
    };
  },
  activated() {
    this.id = this.$route.params.id;
    this.type = this.$route.query.type
    this.favoriteList = this.$store.state.user.favoriteList;
    this.listId = parseInt(this.id, 10)
    if (this.type === 'artist') {
      this.getArtist(this.id)
    } else {
      this.spinning = true;
      // 获取歌单详情
      getPlaylistDetail(this.id).then(res => {
        if (res.data.code === 200) {
          this.playlist = res.data.playlist;
          console.log(this.playlist.tracks)
          this.list = formatTopSongs(this.playlist.tracks);
          document.title = `${this.playlist.name} - ATM`;
          // 获取并处理歌单歌曲
          this._getFavoriteSong()
        }
        this.spinning = false;
      });
      if (this.$store.state.user.favoriteList.length === 0) {
        this.like = false
      } else {
        if (this.$store.state.user.favoriteList.indexOf(this.listId) !== -1) {
          this.like = true;
        } else {
          this.like = false;
        }
      }
    }

  },
  mounted() {
  },
  methods: {
    selectMusic(data) {
      const audio = document.getElementById("atmPlayer");
      audio.src = data.url;
      audio.data = data;
      audio.play();
      // 保存到历史播放
      if (
        this.$store.state.historyList.findIndex(item => {
          return item.name === data.name;
        }) === -1
      ) {
        this.$store.commit("setHistoryList", data);
      }
    },
    async changekLike() {
      if(!this.$store.state.user.username) {
        this.$message.error('请先登录账号');
        return;
      } 
      const params = {
        ...this.$store.state.user,
        listId: this.playlist.id
      }
      const data = await postFavoriteList(params)
      if(typeof data.data === 'object') {
        this.$message.success('歌单更新成功')
        this.$store.commit('setUserInfo', data.data);
        this.like = !this.like;
      } else {
        this.$message.error(data.data)
      }
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
            } else {
              this.$set(item,'like', false);
            }
          })
        }
      } else {
        this.$message.error('请先登录!')
      }
    },
    async getArtist(id) {
      this.spinning = true;
      const data = await getArtistSong(id)
      if (data.data.code === 200) {
          console.log(data.data.artist)
          this.playlist = data.data.artist;
          console.log(this.playlist.tracks)
          this.list = formatTopSongs(data.data.hotSongs);
          this._getFavoriteSong()
      } else {
        this.$message.error('网络错误')
      }
      this.spinning = false;
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  position: relative;
  width: 1500px;
  margin: 0 auto;
  height: 70vh;
  .details-content {
    margin: 20px;
    height: 15vh;
    display: flex;
    align-items: center;
    .details-left {
      .detials-img {
        width: 15vh;
        height: 15vh;
        border-radius: 10px;
      }
    }
    .details-right {
      margin-left: 100px;
      flex: 1;
      text-align: left;
      .details-text {
        font-size: @font_size_large;
        font-weight: bold;
        margin-top: 20px; 
        width: 1100px;
        height: 50px;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap
      }
      .details-img {
        position: absolute;
        right: 20px;
        top: 20px;
        > img {
          width: 40px;
        }
      }
      .details-text.title {
        font-size: 25px;
        margin-top: 15px;
      }
    }
  }
  .details-list {
    width: 100%;
    height: 55vh;
    overflow: auto;
  }
}
</style>
