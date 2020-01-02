<template>
  <!--ATM播放器-->
  <div class="atm-player">
    <audio id="atmPlayer">
      <source src="" type="audio/mpeg" />Your browser does not support the audio element.
    </audio>
    <div class="atm-controller">
      <div class="atm-btns">
        <div class="atm-btn">
          <img src="@/assets/atm_player/speed.png" class='rotate' alt="快退" @click="reverseMusic" />
        </div>
        <div class="atm-btn">
          <img src="@/assets/atm_player/last.png" class='rotate' alt="上一首" @click="lastMusic" />
        </div>
        <div class="atm-btn">
          <img v-if="play" src="@/assets/atm_player/stop.png" alt="播放" @click="playMusic" />
          <img v-if="!play" src="@/assets/atm_player/start.png" alt="暂停" @click="pauseMusic" />
        </div>
        <div class="atm-btn">
          <img src="@/assets/atm_player/last.png" alt="下一首" @click="nextMusic" />
        </div>
        <div class="atm-btn">
          <img src="@/assets/atm_player/speed.png" alt="快进" @click="speedMusic" />
        </div>
        <div class="atm-btn">
          <img v-if="!single" src="@/assets/atm_player/single.png" alt="单曲" @click="singleMusic" />
          <img v-if="single" src="@/assets/atm_player/nosingle.png" alt="不单曲" @click="singleMusic" />
        </div>
      </div>
      <div class="atm-progress">
        <div class="atm-name">
          <div  v-if="audio.data">{{audio.data.name}}</div>
        </div>
        <div class="atm-bar">
          <div ref="currentTime" class="currentTime"></div>
        </div>
        <span class="duration">{{ currentTime | format }} / {{ duration | format }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "@/utils/util";
export default {
  name: "AtmPlayer",
  components: {},
  filters: {
    // 时间格式化
    format
  },
  props: {
    // 歌曲数据
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      audio: {},
      play: true,
      duration: 0,
      currentTime: 0,
      interval: "",
      single: false
    };
  },
  mounted() {
    this.audio = document.getElementById("atmPlayer");
    this.audio.src = "";
    this.audio.addEventListener("play", () => {
      console.log('adsf')
      this.play = false;
      setTimeout(() => {

        this.controlMusicTime();
      }, 100);
    });
  },
  methods: {
    playMusic() {
      this.play = false;
      this.audio.play();
    },
    controlMusicTime() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        if (this.currentTime === this.audio.duration &&this.currentTime !== 0) 
        { 
          if (this.single) {
            this.audio.currentTime = 0;  
            this.playMusic()
          } else {
            this.audio.currentTime = 0;
            this.currentTime = 0;
            this.audio.pause();
            this.nextMusic();
            this.play = true;
          }
        }
        this.duration = this.audio.duration;
        this.currentTime = this.audio.currentTime;
        this.$refs.currentTime.style.width =
          600 * (this.currentTime / this.duration) + "px";
      }, 100);
    },
    pauseMusic() {
      this.play = true;
      clearInterval(this.interval);
      this.currentTime = this.audio.currentTime;
      this.audio.pause();
    },
    lastMusic() {
      let nowIndex = 0;
      const data = this.$store.state.historyList.filter((item, index) => {
        if (item.name === this.audio.data.name) {
          nowIndex = index;
        }
        return item;
      });
      if (data.length === 1 || nowIndex === 0) {
        this.$message.error("没有上一首历史");
        return;
      }
      this.audio.src = data[nowIndex - 1].url;
      this.audio.data = data[nowIndex - 1];
      this.audio.play();
    },
    nextMusic() {
      let nowIndex;
      const data = this.$store.state.historyList.filter((item, index) => {
        if (item.name === this.audio.data.name) {
          nowIndex = index;
        }
        return item;
      });
      if (data.length === 1 || data.length - 1 === nowIndex) {
        this.$message.error("没有下一首历史");
        return;
      }
      this.audio.src = data[nowIndex + 1].url;
      this.audio.data = data[nowIndex + 1];
      this.audio.play();
    },
    singleMusic() {
      this.single = !this.single;
    },
    reverseMusic() {
      this.audio.currentTime -= 15;
      this.currentTime = this.audio.currentTime
    },
    speedMusic() {
      this.audio.currentTime += 15;
      this.currentTime = this.audio.currentTime
    }
  }
};
</script>

<style lang="less" scoped>
.atm-player {
  width: 100%;
  position: fixed;
  bottom: 20px;
  .atm-controller {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .atm-btns {
      display: flex;
      .atm-btn {
        margin: 20px;
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
        .rotate {
          transform: rotate(180deg);
        }
      }
    }
    .atm-progress {
      height: 60px;
      min-width: 800px;
      .atm-bar {
        border-radius: 5px;
        overflow: hidden;
        width: 600px;
        height: 10px;
        background-color: #d9d9d9;
        display: inline-block;
      }
      .atm-name {
        height: 25px;
      }
      .currentTime {
        width: 0px;
        height: 10px;
        background-color: @attitude_color;
      }
      .duration {
        margin-left: 10px;
      }
    }
  }
}
</style>
