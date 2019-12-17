<template>
  <!--我的歌单-->
  <div class="userList">
    <div class="userList-content">
      <div
        v-for="(list, i) in dataList"
        :key="i"
        class="userList-music"
        @click="toTopListDetail(list.id)"
      >
        <img draggable="false" :src="list.coverImgUrl" alt class="img" />
        <div class="text">{{ list.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFavoriteList } from "api/favorite";
import { getPlaylistDetail } from "api";
export default {
  name: "userList",
  components: {},
  data() {
    return {
      dataList: [],
      idList: [],
    };
  },
  activated() {
    this.favoriteList();
  },
  methods: {
    async favoriteList() {
      // 请求获取最新收藏id数组
      if(this.$store.state.user.username) {
        const user = this.$store.state.user
        const data = await getFavoriteList(user)
        if(typeof data.data === 'object') {
          this.idList = data.data.favoriteList;
          this.$store.commit('setUserInfo', data.data);
        }
      } else {
        this.$message.error('请先登录!')
      }
      let favorites = []
      // 根据最新的id数组获取列表数据
      if(this.idList.length !== 0) {
        this.idList.filter( async( item ) => {
          const data = await getPlaylistDetail(item);
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
.userList {
  width: 1500px;
  margin: 0 auto;
  overflow: auto;
  .userList-content {
    width: 1000px;
    margin: 0 auto;
    .userList-music {
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
    .userList-music:hover {
      color: @attitude_color;
    }
  }
}
</style>
