<template>
  <!--搜索-->
  <div class="video">
    <a-spin :spinning='spinning'>
        <div id='atm-video1'>  </div> 
        <div id='atm-video2'>  </div> 
        <div id='atm-video3'>  </div> 
        <div id='atm-video4'>  </div> 
        <div id='atm-video5'>  </div> 
      
        <a-upload
          accept='video/*'
          :multiple="false"
          :showUploadList="false"
          :customRequest="()=>{}"
          :beforeUpload="beforeUpload"
        >
          <a-button> <a-icon type="upload" /> Click to Upload </a-button>
        </a-upload>
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
      console.log('adf',this.$store.state.user)
      if(this.$store.state.user.videos) {  
        const videos = this.$store.state.user.videos
        for(let i = 0; i < videos.length; i++) {
          let params = {
            _id: this.$store.state.user._id,
            video: videos[i]
          }
          let res = await getVideo(params)
          if(res.status === 200) {
            const blob = new Blob([res.data], {type: 'application/mp4'});
            const href = window.URL.createObjectURL(blob);
            this.videoSrc = href;
            new Player({
              id: 'atm-video' + i,
              url: this.videoSrc,
              videoInit: true
            });
          }
        }
      }
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    // 限制视频上传小于1G && 手动上传
    async beforeUpload(file) {
      const isLt1G = file.size / 1024 / 1024 < 1000;
      if (!isLt1G) {
        this.$message.error('视频必须小于1G');
        return false;
      }
      this.spinning = true;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      console.log(this.$store.state.user.username)
      formData.append('_id', this.$store.state.user._id);
      const a =  await postVideo(formData);
      if (a) {
        this.$message.success('上传成功');
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
  height: 80vh;
  .video-content {
    height: 75vh;
    overflow: hidden;
  }
  .video-head {
    display: flex;
    height: 80px;
    padding: 10px 15px;
    overflow: hidden;
    .video-tag {
      line-height: 40px;
      margin-left: 15px;
      height: 40px;
      background-color: #C9665C;
      cursor: pointer;
      &:hover {
        color: @attitude_color;
        background-color: #fff;
      }
    }
    .video-input {
      flex: 1;
      height: 40px;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid #999;
      outline: 0;
      background: transparent;
      color: #555;
      font-size: @font_size_medium;
      box-shadow: 0 0 1px 0 #fff inset;
      &::placeholder {
        color: #999;
      }
    }
  }
  .musicList {
    width: 100%;
    height: calc(~"100% - 50px");
  }
}
</style>

