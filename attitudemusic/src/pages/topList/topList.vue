<template>
  <!--排行榜-->
  <div class="topList">
    <div class="topList-content">
      <!--      <div class="topList-artist">-->
      <!--        <div>歌手榜</div>-->
      <!--        <div v-for='(artist, index) in topList.artistToplist.artists' :key='index'>-->
      <!--          <div>{{artist}}</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div
        v-for="(list, i) in topList.list"
        :key="i"
        class="topList-music"
        @click="toTopListDetail(list.id)"
      >
        <img draggable="false" :src="list.coverImgUrl" alt class="img" />
        <div class="text">{{ list.name }}</div>
      </div>
    </div>
  </div>
</template>

<script >
import { getToplistDetail } from "api";
export default {
  name: "TopList",
  components: {},
  data() {
    return {
      topList: []
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    async getTopList() {
      const data = await getToplistDetail();
      if (data.data.code === 200) {
        this.topList = data.data;
      }
      console.log(this.topList);
    },
    async toTopListDetail(id) {
      this.$router.push({ path: `/music/details/${id}` });
    },
  }
};
</script>

<style lang="less" scoped>
.topList {
  width: 1500px;
  margin: 0 auto;
  overflow: auto;
  .topList-content {
    width: 1000px;
    margin: 0 auto;
    .topList-music {
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
    .topList-music:hover {
      color: @attitude_color;
    }
  }
}
</style>
