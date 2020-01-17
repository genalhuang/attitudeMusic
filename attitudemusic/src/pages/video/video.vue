<template>
  <!--搜索-->
  <div class="video">
          <div class='video-footer'>
         <a-upload
          accept='video/*'
          :multiple="false"
          :showUploadList="false"
          :customRequest="()=>{}"
          :beforeUpload="beforeUpload"
        >
          <a-button> <a-icon type="upload" /> Click to Upload </a-button>
        </a-upload>
      </div>
    <a-spin :spinning='spinning'>
      <div class='video-content'>
        <template v-for='(item,i) in $store.state.user.videos'>
          <div :key='i'>
            <div :id='"atm-video"+i'></div>
            <div v-if='!spinning'>{{item}}</div>
          </div>
        </template>
      </div>
    </a-spin>
  </div>
</template>

<script>
import {  getVideo, postVideo } from "api/favorite";
import Player from 'xgplayer';
export default {
  name: "Video",
  components: {
  },
  data() {
    return {
      videoSrc: '',
      spinning: false
    }
  },
  activated() {
    this.getVideo();
  },
  methods: {
    async getVideo() {
      if(this.$store.state.user.videos) {  
        const videos = this.$store.state.user.videos
        for(let i = 0; i < videos.length; i++) {
          let params = {
            _id: this.$store.state.user._id,
            video: videos[i]
          }
          this.spinning = true;
          let res = await getVideo(params)
          if(res.status === 200) {
            const blob = new Blob([res.data], {type: 'application/mp4'});
            const href = window.URL.createObjectURL(blob);
            this.videoSrc = href;
            new Player({
              id: 'atm-video' + i,
              url: this.videoSrc,
              fluid: true,
              videoInit: true
            });
          }
          this.spinning = false;
        }
      }
    },
    // 限制视频上传小于1G && 手动上传
    async beforeUpload(file) {
      if(!this.$store.state.user.username) {
        this.$message.error('请先登录')
        return false;
      }
      const isLt1G = file.size / 1024 / 1024 < 1000;
      if (!isLt1G) {
        this.$message.error('视频必须小于1G');
        return false;
      }
      this.spinning = true;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      formData.append('_id', this.$store.state.user._id);
      const a =  await postVideo(formData);
      if (a) {
        this.$store.commit('setUserInfo', a.data);
        this.$message.success('上传成功');
        this.getVideo();
      } else {
        this.$message.error('上传失败');
      }
      this.spinning = false;
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.video {
  position: relative;
  width: 1500px;
  margin: 0 auto;
  height: 70vh;
  .video-content {
    position: relative;
    width: 1500px;
    margin: 0 auto;
    height: 70vh;
    overflow: auto;
    > div {
      display: inline-block;
      width: 25%;
      margin: 3%;
    }
  }
  .video-footer {
    height: 50px;
    padding: 30px;
  }
}
</style>

