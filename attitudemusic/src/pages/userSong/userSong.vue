<template>
  <!--我的歌单-->
  <div class="usrSong">
    <a-spin :spinning="spinning">
      <div class="usrSong-content">
        <music-list
          class='musicList'
          ref="musicList"
          :list="dataList"
          @selectMusic="selectMusic"
        />
      </div>
    </a-spin>
  </div>
</template>
<script>
import { getFavoriteSong } from "api/favorite";
import { getMusicDetail } from 'api'
import MusicList from "components/music-list/music-list.vue";
import { formatTopSongs } from "@/utils/song";
import Cookie from 'js-cookie';
export default {
  name: "userSong",
  components: {
    MusicList
  },
  data() {
    return {
      dataList: [],
      idList: [],
      spinning: false
    };
  },
  async activated() {
    this.favoriteSong();
  },
  methods: {
    async favoriteSong() {
      // 请求获取最新喜欢音乐id数组
      this.dataList = [];
      if(this.$store.state.user.username) {
        const user = this.$store.state.user
        this.spinning = true;
        const data = await getFavoriteSong(user)
        this.spinning = false;
        if(typeof data.data === 'object') {
          this.idList = data.data.favoriteSong;
          this.idList.filter(async (item, index) => {
            const data = await getMusicDetail(item)
            data.data.songs[0].like = true;
            this.dataList[index] = data.data.songs[0]
            if(this.dataList.filter((item) => {
              return item.name !== '';
            }).length === this.idList.length) {
              this.dataList = formatTopSongs(this.dataList)
            }
          })
        }
      } else {
        this.$message.error('请先登录!')
      }
    },
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
        Cookie.set("historyList", this.$store.state.historyList);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.usrSong {
  width: 1500px;
  margin: 0 auto;
  .userSong-null {
    margin-top: 10px;
  }
  .usrSong-content {
    width: 1500px;
    margin: 0 auto;
    .usrSong-music {
      max-width: 16%;
      width: 15%;
      margin: 2%;
      float: left;
      .img {
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
      }
      .text {
        margin-top: 3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .usrSong-music:hover {
      color: @attitude_color;
    }
    .musicList {
      height: 70vh;
    }
  }
}
</style>
