<template>
  <!--搜索-->
  <div class="video">
    <div class='video-top'>
        <!-- <div class='title'>我的mv</div> -->
        <a-upload
        accept='video/*'
        :multiple="false"
        :showUploadList="false"
        :customRequest="()=>{}"
        :beforeUpload="beforeUpload"
      > 
        <a-button> <a-icon type="upload" />上传mv</a-button>
      </a-upload>
    </div>
    <a-spin :spinning='spinning'>
      <div class='video-content'>
        <div v-for='(item,i) in $store.state.user.videos' :key='i'>
          <div class='video-mask' @click='previewVideo(item)'>
            <div :id='"atm-video"+i' class='video'></div>
          </div>
          <div class='text' v-if='!spinning'>
            {{item}}
            <a-button v-if='!spinning' type='danger' @click='deleteVideo(item)'><a-icon type="delete" />删除</a-button>
          </div>
        </div>
      </div>
    </a-spin>
    <!-- 预览mv的弹窗 -->
    <a-modal 
      class='preview-modal'
      :title="videoSrc" 
      v-model="visible" 
      cancelText="取消"
      okText="确定"
      :destroyOnClose='true' 
      @ok='()=>{visible = !visible}'
      :width='900'
    >
      <video-preview :videoSrc='videoSrc'></video-preview>
    </a-modal>
  </div>
</template>

<script>
import {  getVideo, postVideo, deleteVideo } from "api/favorite";
import Player from 'xgplayer';
import Cookie from 'js-cookie'
import VideoPreview from './components/videoPreview.vue'
export default {
  name: "Video",
  components: {
    VideoPreview
  },
  data() {
    return {
      videoSrc: '',
      spinning: false,
      visible: false
    }
  },
  created() {
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
    // 限制视频上传小于200m && 手动上传
    async beforeUpload(file) {
      if(!this.$store.state.user.username) {
        this.$message.error('请先登录')
        return false;
      }
      const isLt200m = file.size / 1024 / 1024 < 200;
      if (!isLt200m) {
        this.$message.error('视频必须小于200m');
        return false;
      }
      this.spinning = true;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      formData.append('_id', this.$store.state.user._id);
      const res =  await postVideo(formData);
      if (res.status === 200) {
        this.$store.commit('setUserInfo', res.data);
        Cookie.set('userInfo', res.data);
        this.getVideo();
        this.$message.success('上传成功');
      } else {
        this.$message.error('上传失败');
      }
      this.spinning = false;
      return false;
    },
    async deleteVideo(video) {
      const that = this;
      this.$confirm({
        title: '确认删除该mv吗？',
        okText: '确认',
        cancelText: '取消',
        centered: true,
        async onOk() {
          that.spinning = true;
          let params = {
            _id: that.$store.state.user._id,
            video
          }
          let res = await deleteVideo(params)
          if(res.status === 200) {
            that.$store.commit('setUserInfo', res.data);
            Cookie.set('userInfo',res.data);
            that.getVideo();
          }
          that.spinning = false;
        }
      });
    },
    // 挂载预览视频
    previewVideo(video) {
      setTimeout(() => {
        this.visible= !this.visible
      },100)
      this.videoSrc=video;
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
    width: 100%;
    margin: 0 auto;
    height: 70vh;
    overflow: auto;
    > div {
      display: inline-block;
      width: 25%;
      margin:2% 4%;
      float: left;
      .video-mask {
        &:before  {
          content:'';
          width:375px;
          height:211px;
          display: block;
          position: absolute;
          z-index: 999;
          background-color: rgba(0,0,0,0);
          cursor: pointer;
        }
      }
      .video {
        border-radius: 10px;
        overflow: hidden;
        transition: .3s linear;

      }
      .video:hover {
        transform:translateY(-10px);
      }
      .text {
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
      }
      &:hover{
        color: @attitude_light_color;
      }
    }
  }
  .video-top {
    height: 60px;
    padding-top: 15px;
    border-bottom: 5px solid @attitude_color;
    display: flex;
    justify-content: center;
    > .title {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>

