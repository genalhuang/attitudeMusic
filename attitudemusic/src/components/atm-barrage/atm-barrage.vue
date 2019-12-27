<template>
  <div class="atm-barrage">
    <div class="atm-content">
      <!-- <template v-for='item in commentList'>
        <div :key='item'>{{item.content}}</div>
      </template> -->
      <div class='atm-comment'>{{currentComment}}</div>
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
        position: absolute;
        display: flex;
        flex-wrap: nowrap;
        text-align: right;
        animation: myfirst 5s linear infinite;
      }
   }
 }
@keyframes myfirst
{
  0%   {right: -200px;}
  50%  {right: 800px;}
  100% {right: 1600px;}
}
</style>
