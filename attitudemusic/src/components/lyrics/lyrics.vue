
<template>
  <div class="lyrics">
    <div
      ref="musicLyric"
      class="music-lyric"
    >
      <div
        class="music-lyric-items"
        :style="lyricTop"
      >
        <p v-if="nolyric">
          暂无歌词！
        </p>
        <template v-else-if="lyric.length>0">
          <p
            v-for="(item,index) in lyric"
            :key="index"
            :class="{on:lyricIndex===index}"
          >
            {{ item.text }}
          </p>
        </template>
        <p v-else>
          歌词加载失败！
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lyrics',
  components: {},
  props: {
    lyric: {
      type: Array,
      default: () => []
    },
    // 是否无歌词
    nolyric: {
      type: Boolean,
      default: false
    },
    music: {
      type: Object,
      default: () => {}
    },
    lyricIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      top: 0, // 歌词居中
    }
  },
  computed: {
    lyricTop () {
      return `transform :translate3d(0, ${(-52 * this.lyricIndex) + this.top}px, 0)`
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.clacTop(), 60)
    })
    this.$nextTick(() => this.clacTop())
  },
  methods: {
    computedLyricIndex () {
      let time
      setInterval(() => {
        time = Math.floor(document.getElementById('atmPlayer').currentTime)
        time = this.lyric.findIndex((item) => {
          return item.time === time
        })
        if (time > -1) {
          this.lyricIndex = time
        }
      }, 900)
    },
    // 计算歌词居中的 top值
    clacTop() {
      const dom = this.$refs.musicLyric
      const { display = '' } = window.getComputedStyle(dom)
      if (display === 'none') {
        return
      }
      const height = dom.offsetHeight
      this.top = Math.floor(height / 180)
    }
  }
}

</script>

<style scoped lang="less" >
 .lyrics {
  padding-bottom: 20px;
  text-align: center;
  font-size: @font_size_medium;
 }
 /*歌词部分*/
.music-lyric {
  position: absolute;
  top: 315px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0.6) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  .music-lyric-items {
    margin-top: 200px;
    text-align: center;
    line-height: 34px;
    font-size: @font_size_large;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    .on {
      color: @attitude_color;
    }
  }
}
</style>
