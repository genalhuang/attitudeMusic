<template>
  <!--我的歌单-->
  <div class="userList">我的歌单</div>
</template>

<script>
</script>

<style lang="less" scoped>
.userList {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &-head {
    height: 100px;
  }
  .list-item {
    float: left;
    width: calc(~"100% / 7");
    .userList-item {
      width: 130px;
      text-align: center;
      cursor: pointer;
      margin: 0 auto 20px;
      &:hover {
        color: #fff;
      }
      .name {
        height: 30px;
        line-height: 30px;
        font-size: @font_size_medium;
        .no-wrap();
      }
      @media (max-width: 1100px) {
        width: 80%;
      }
    }
    @media (max-width: 1500px) {
      width: calc(~"100% / 6");
    }
    @media (max-width: 1400px), (max-width: 960px) {
      width: calc(~"100% / 5");
    }
    @media (max-width: 1280px), (max-width: 768px) {
      width: calc(~"100% / 4");
    }
    @media (max-width: 540px) {
      width: calc(~"100% / 3");
    }
  }
}
</style>
