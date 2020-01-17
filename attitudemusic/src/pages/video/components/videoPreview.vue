<template>
  <div class='video-preview'>
    <a-spin :spinning='spinning'>
      <div  class='videoContainer'>
        <div id='preview'></div>
      </div>
    </a-spin>
  </div>
</template>
<script lang="ts">
import Player from 'xgplayer';
import { getVideo } from "api/favorite";
export default {
  name: 'videoPreview',
  props: {
    videoSrc: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      spinning: false,
      title: '',
      video: ''
    }
  },
  created() {
    this.video = this.videoSrc
    this.getVideo()
  },
  methods: {
    async getVideo() {
      if(this.$store.state.user.videos) {  
          let params = {
            _id: this.$store.state.user._id,
            video: this.video
          }
          let res = await getVideo(params)
          if(res.status === 200) {
            const blob = new Blob([res.data], {type: 'application/mp4'});
            const href = window.URL.createObjectURL(blob);
            this.video = href;
            new Player({
              id: 'preview',
              url: this.video,
              fluid: true,
              videoInit: true,
              playbackRate: [0.5, 0.75, 1, 1.5, 2],
              autoplay: true
            });
          this.spinning = false;
        }
      }
    }
  }

}
</script>
<style scoped lang="less">
  .video-preview {
    
  }
</style>