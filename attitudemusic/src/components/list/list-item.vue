<template>
  <div class="topList-music" @click='clickList(list.id)'>
    <img draggable="false" :src="list.coverImgUrl" alt class="img" />
    <div class="text">{{ list.name }}</div>
    <div class='play'>
      <img style='width:20px' src="@/assets/img/play.png"  alt="">
      {{list.playCount}}
    </div>
  </div>
</template>

<script >
export default {
  name: "TopList",
  components: {},
  props: {
    // 歌曲数据
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    };
  },
  methods: {
    clickList(id) {
      this.$emit('clickList', id)
    }
  }
};
</script>

<style lang="less" scoped>
  .topList-music {
    height: 100%;
    max-width: 16%;
    width: 18%;
    margin: 2%;
    float: left;
    position: relative;
    .img {
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
    }
    .text {
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .play {
      position: absolute;
      top: 4px;
      right: 4px;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }
  .topList-music:hover {
    color: @attitude_color;
  }
</style>
