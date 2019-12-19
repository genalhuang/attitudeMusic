<template>
  <!--我的歌单-->
  <div class="usrSong">
    <a-spin :spinning="spinning">
      <div class="usrSong-content">
      </div>
    </a-spin>
  </div>
</template>
<script>
import { getFavoriteSong } from "api/favorite";
import { getPlaylistDetail } from "api";
export default {
  name: "userSong",
  components: {},
  data() {
    return {
      dataList: [],
      idList: [],
      spinning: false
    };
  },
  activated() {
    this.spinning = true;
    this.favoriteSong();
  },
  methods: {
    async favoriteSong() {
      // 请求获取最新收藏id数组
      if(this.$store.state.user.username) {
        const user = this.$store.state.user
        const data = await getFavoriteSong(user)
        if(typeof data.data === 'object') {
          this.idList = data.data.favoriteSong;
          this.$store.commit('setUserInfo', data.data);
        }
      } else {
        this.$message.error('请先登录!')
      }
      let favorites = []
      // 根据最新的id数组获取列表数据
      if(this.idList.length !== 0) {
        let success = 0;
        this.idList.filter( async( item ) => {
          const data = await getPlaylistDetail(item);
          success += 1
          if(success === this.idList.length) {
            this.spinning = false;
          }
          if (data.data.code === 200) {
            favorites.push(data.data.playlist)  
          } else {
            this.$message.error('网络错误!')
          }
        })

      }
      this.dataList = favorites;
    },
    async toTopListDetail(id) {
      this.$router.push({ path: `/music/details/${id}` });
    },
  }
};
</script>
<style lang="less" scoped>
.usrSong {
  width: 1500px;
  margin: 0 auto;
  overflow: auto;
  .usrSong-content {
    width: 1000px;
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
  }
}
</style>
