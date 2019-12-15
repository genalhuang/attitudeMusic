<template>
  <!--歌曲列表-->
  <div class="musicList">
    <template v-if="list.length>0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span v-if="'listType' === 1" class="list-time">时长</span>
        <span v-else class="list-album">专辑</span>
      </div>
      <div ref="listContent" class="list-content">
        <div v-for="(item,index) in list" :key="item.id" class="list-item">
          <span class="list-num" v-text="index+1" />
          <div class="list-name" @click="clickMusic(item)">
            <span>{{ item.name }}</span>
          </div>
          <span class="list-artist">{{ item.singer }}</span>
          <span v-if="'listType' === 1" class="list-time">{{ (item.duration % 3600) | format }}</span>
          <span v-else class="list-album">{{ item.album }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  props: {
    // 歌曲数据
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickMusic(item) {
      this.$emit("selectMusic", item);
    }
  }
};
</script>

<style lang="less" scoped>
.musicList {
  width: 1500px;
  margin: 0 auto;
}
.list-header {
  margin-top: 1px solid #fff;
  border-bottom: 1px solid @list_head_line_color;
  color: @attitude_color;
  font-weight: bold;
  background-color: #fff;
  .list-name {
    padding-left: 40px;
    user-select: none;
    border-right: 1px solid #fff;
  }
  .list-artist {
    border-right: 1px solid #fff;
  }
}

.list-content {
  width: 100%;
  height: calc(~"100% - 60px");
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .list-item:hover {
    background-color: @attitude_color;
    color: #fff;
    .list-name {
      span {
        cursor: pointer;
      }
    }
  }
}

.list-item {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid @list_item_line_color;
  line-height: 50px;
  overflow: hidden;


  &.on {
    color: #fff;

    .list-num {
      font-size: 0;
      background: url("~assets/img/wave.gif") no-repeat center center;
    }
  }

  .list-num {
    display: block;
    width: 30px;
    margin-right: 10px;
    text-align: center;
  }

  .list-name {
    position: relative;
    flex: 1;
    box-sizing: border-box;

    & > span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    small {
      margin-left: 5px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    /*hover菜单*/

    .list-menu {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      height: 40px;
      font-size: 0;
      transform: translateY(-50%);
    }
  }

  .list-artist,
  .list-album {
    display: block;
    width: 300px;
  }

  .list-time {
    display: block;
    width: 60px;
    position: relative;

    .list-menu-icon-del {
      display: none;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
