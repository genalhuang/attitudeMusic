<template>
  <div class="atm-barrage">
    <div class="atm-content">
      <div class='atm-comment' v-if='currentComment.length'>
        <span class='text'>{{currentComment}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment } from "api";
export default {
  name: 'AtmBarrage',
  components: {
  },
  props: {
    // 歌曲数据
    music: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      commentList: [],
      currentComment: '',
      interval:''
    }
  },
  activated() {
    if (this.music.id) {
      this._getComment()
    }
  },
  methods: {
    async _getComment() {
      clearInterval(this.interval);
      let index = 0;
      let res = await getComment(this.music.id,1);
      if (res.data.code === 200) {
        this.commentList = res.data.comments;
      }
      this.interval = setInterval(() => {
        index++;
        this.currentComment = this.commentList[index].content
        if(index === this.commentList.length-1) {
          index = 0;
        }
      },5000)
    }
  }
}

</script>

<style scoped lang="less" >
 .atm-barrage {
   width: 100%;
   .atm-content {
      width: 100%;
      position: relative;
      right: 0;
      .atm-comment {
        width: 2000px;
        position: absolute;
        text-align: right;
        animation: myfirst 5s linear infinite;
        .text {
          padding: 5px 10px;
          min-height: 30px;
          line-height: 30px;
          background-color: #C9665C;
          opacity: .9;
          border-radius: 15px;
        }
        .text:hover {
          color: #C9665C;
          background-color: #fff;
          transition: 1s;
        }
      }
   }
 }
@keyframes myfirst
{
  0%   {right: -100px;}
  50%  {right: 500px;}
  100% {right: 1200px;}
}
</style>
