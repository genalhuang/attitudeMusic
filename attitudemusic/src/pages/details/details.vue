<template>
  <!--歌单详情-->
  <div class="details">
    <div class="details-content">
      <div class="details-left">
        <img class='detials-img' :src="playlist.coverImgUrl" alt />
      </div>
      <div class="details-right">
        <div class="details-text title">{{playlist.name}}</div>
        <div class="details-text">{{playlist.description}}</div>
        <div class="details-text">创建时间 : {{playlist.createTime | formatDate}}</div>
      </div>
    </div>
    <music-list class='music-list' :list="list" @selectMusic="selectMusic" />
  </div>
</template>

<script>
import { getPlaylistDetail } from "api";
import { formatTopSongs } from "@/utils/song";
import { format, formatDate } from "@/utils/util";
import MusicList from "components/music-list/music-list.vue";
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
      playlist: {}
    };
  },
  activated() {
    // 获取歌单详情
    getPlaylistDetail(this.$route.params.id).then(res => {
      if (res.data.code === 200) {
        this.playlist = res.data.playlist;
        console.log(this.playlist);
        this.list = formatTopSongs(this.playlist.tracks);
        document.title = `${this.playlist.name} - ATM`;
      }
    });
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
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  position: relative;
  width: 1500px;
  margin: 0 auto;
  height: 100%;
  .details-content {
    margin: 20px;
    display: flex;
    align-items: top;
    .details-left {
      .detials-img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }
    .details-right {
      margin-left: 100px;
      flex: 1;
      text-align: left;
      .details-text {
        font-size: @font_size_large_x;
        font-weight: bold;
        margin-top: 20px;
      }
      .details-text.title {
        font-size: 40px;
      }
    }
    

  }
  .music-list {
  }
}
</style>
