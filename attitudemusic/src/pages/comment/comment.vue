<template>
  <!--评论-->
  <div class="comment">评论</div>
</template>

<script>
export default {
  name: "Comment"
};
</script>

<style lang="less" scoped>
.comment {
  position: relative;
  transform: translate3d(0, 0, 0);
  width: 1500px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  .comment-list {
    height: 100%;
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .comment-title {
      height: 34px;
      line-height: 34px;
      padding: 10px 0;
      color: @text_color_active;
      border-bottom: 1px solid @comment_head_line_color;
    }
    .comment-item {
      position: relative;
      padding: 15px 0 15px 55px;
      border-bottom: 1px solid @comment_item_line_color;
      .comment-item-pic {
        display: block;
        position: absolute;
        left: 0;
        top: 20px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
      }
      .comment-item-title {
        height: 20px;
        margin-bottom: 6px;
        font-weight: 400;
        .no-wrap();
        color: @text_color_active;
      }
      .comment-item-disc {
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
        line-height: 25px;
        text-align: justify;
        color: @text_color;
        img {
          position: relative;
          vertical-align: middle;
          top: -2px;
        }
      }
      .comment-item-replied {
        padding: 8px 19px;
        margin-top: 10px;
        line-height: 20px;
        border: 1px solid @comment_replied_line_color;
        a {
          color: @text_color_active;
        }
      }
      .comment-item-opt {
        margin-top: 10px;
        line-height: 25px;
        text-align: right;
        overflow: hidden;
        .comment-opt-date {
          float: left;
          line-height: 28px;
        }
        .comment-opt-liked {
          display: inline-block;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
