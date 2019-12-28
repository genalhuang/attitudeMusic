<template>
  <!--排行榜-->
  <div class="topList">
    <a-spin :spinning='spinning'>
      <div class="topList-content">
        <div  class="topList-choiceness">
          <div class='topList-title'>网友精选</div>
          <a-tabs v-model='tab' @change='changeType'>
            <a-tab-pane key="华语" color='red'>
              <span slot="tab">
                <a-icon type="smile" />
                华语
              </span>
              <div
                class="topList-list"
              >
                <template v-for="(list, i) in choiceness">
                  <list-item :list='list' @clickList="clickList" :key="i"></list-item>
                </template>
              </div>
            </a-tab-pane>
            <a-tab-pane key="流行">
              <span slot="tab">
                <a-icon type="smile" />
                流行
              </span>
              <div
                class="topList-list"
              >
                <template v-for="(list, i) in choiceness">
                  <list-item :list='list' @clickList="clickList" :key="i"></list-item>
                </template>
              </div>
            </a-tab-pane>
            <a-tab-pane key="摇滚">
              <span slot="tab">
                <a-icon type="smile" />
                摇滚
              </span>
              <div
                class="topList-list"
              >
                <template v-for="(list, i) in choiceness">
                  <list-item :list='list' @clickList="clickList" :key="i"></list-item>
                </template>
              </div>
            </a-tab-pane>
            <a-tab-pane key="民谣">
              <span slot="tab">
                <a-icon type="smile" />
                民谣
              </span>
              <div
                class="topList-list"
              >
                <template v-for="(list, i) in choiceness">
                  <list-item :list='list' @clickList="clickList" :key="i"></list-item>
                </template>
              </div>
            </a-tab-pane>
            <a-tab-pane key="怀旧">
              <span slot="tab">
                <a-icon type="smile" />
                怀旧
              </span>
              <div
                class="topList-list"
              >
                <template v-for="(list, i) in choiceness">
                  <list-item :list='list' @clickList="clickList" :key="i"></list-item>
                </template>
              </div>
            </a-tab-pane>
            <a-tab-pane key="治愈">
              <span slot="tab">
                <a-icon type="smile" />
                治愈
              </span>
              <div
                class="topList-list"
              >
                <template v-for="(list, i) in choiceness">
                  <list-item :list='list' @clickList="clickList" :key="i"></list-item>
                </template>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="topList-top">
          <div class='topList-title'>排行榜</div>
          <div
            class="topList-music"
          >
            <template v-for="(list, i) in topList.list">
              <list-item  @clickList="clickList" :list='list' :key="i"></list-item>
            </template>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script >
import { getToplistDetail, getTypeList } from "api";
import ListItem from 'components/list/list-item.vue'
export default {
  name: "TopList",
  components: {
    ListItem
  },
  data() {
    return {
      topList: [],
      spinning: false,
      choiceness: [],
      tab:'华语'
    };
  },
  activated() {
    this._getTopList();
    this._getTypeList(this.tab);
  },
  methods: {
    async _getTopList() {
      this.spinning = true;
      const data = await getToplistDetail();
      if (data.data.code === 200) {
        this.topList = data.data;
        this.topList.list = this.topList.list.slice(1,11)
      } else {
        this.$message.error('网络错误')
      }
      this.spinning = false;
    },
    async _getTypeList(type) {
      this.spinning = true;
      const data = await getTypeList('new', type)
      if (data.data.code === 200) {
        this.choiceness = data.data.playlists.slice(1,11);
      } else {
        this.$message.error('网络错误')
      }
      this.spinning = false;
    },
    async clickList(id) {
      this.$router.push({ path: `/music/details/${id}` });
    },
    async changeType(val) {
      this.tab = val;
      this._getTypeList(val);
    }
  }
};
</script>

<style lang="less" scoped>
.topList {
  width: 1500px;
  height: 70vh;
  margin: 0 auto;
  overflow: auto;
  .topList-content {
    width: 1000px;
    height: 70vh;
    margin: 0 auto;
    .topList-list {
      height: 200px;
    }
    .topList-title {
      font-size: @font_size_large_x;
      font-weight: bold;
      line-height: 40px;
      margin-top: 2%;
    }
    .topList-choiceness {
      height: 600px;
      // .tab {
        // width: 80px;
        // display: block;
        // background: url('../../assets/wave.gif') no-repeat left center;
        // background-color: red;
      // }
    }
    .topList-top {
      height: 40vh;
    }
  }
}
</style>
