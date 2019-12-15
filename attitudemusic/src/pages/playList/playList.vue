<template>
  <!--正在播放-->
  <div class="playList">
    <div v-if="music" class="playList-left">
      <img :src="music.image || 'http://p4.music.126.net/4didUTCXHzRrQvaXFEGcYg==/109951164475111588.jpg?param=200y200'" alt="专辑照片" class="playList-img" />
      <div class="playList-text">{{ music.name }}</div>
      <div class="playList-text">{{ music.singer }}</div>
      <div></div>
    </div>
    <div class="playList-right">
      <lyrics :lyric="lyric" :nolyric="nolyric" :music="music" :lyricIndex="lyricIndex"/>
    </div>
  </div>
</template>

<script>
import { getLyric } from "api";
import { parseLyric } from "@/utils/util";
import Lyrics from "components/lyrics/lyrics.vue";
export default {
  name: "PlayList",
  components: {
    Lyrics
  },
  data() {
    return {
      music: {},
      lyric: null,
      nolyric: true,
      lyricIndex: 0
    };
  },
  mounted() {
    // 监听播放事件切换歌词
    document.getElementById("atmPlayer").addEventListener("play", () => {
      this.music = document.getElementById("atmPlayer").data;
      let time
      setInterval(() => {
        time = Math.floor(document.getElementById('atmPlayer').currentTime)
        time = this.lyric.findIndex((item) => {
          return item.time === time
        })
        if (time > -1) {
          this.lyricIndex = time
        }
      }, 1000)
      this.getLyric();
    });
  },
  methods: {
    async getLyric() {
      const res = await getLyric(this.music.id);
      if (res.status === 200) {
        if (res.data.nolyric) {
          this.nolyric = true;
        } else {
          this.nolyric = false;
          this.lyric = parseLyric(res.data.lrc.lyric);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.playList {
  border-bottom: 2px solid #ccc;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  height: 100%;
  .playList-left {
    width: 50%;
    .playList-img {
      height: 260px;
      width: 260px;
      border-radius: 130px;
      margin: 10% 0 10px;
      animation: poster 20s linear infinite;
      border: 10px solid #ccc;
    }
    .playList-text {
      font-size: @font_size_large;
      margin: 25px;
    }
  }
  .playList-right {
    width: 50%;
  }
}
// 动画
@keyframes poster {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
