<template>
  <!--排行榜-->
  <div class="artists">
    <a-spin :spinning='spinning'>
      <div class="artists-content">
        <div  class="artists-choiceness">
          <div class='artists-title'>歌手列表</div>
          <a-tabs v-model='tab' @change='changeType'>
            <a-tab-pane :key="5001" color='red'>
              <span slot="tab">
                <a-icon type="smile" />
                入驻歌手
              </span>
              <div class="artists-list">
                <div class='artists-item' v-for='(item, key) in artistList' :key='key'>
                  <a-avatar :src="item.picUrl" class='artists-songer'></a-avatar>
                  <div class='artists-name'>{{item.name}}</div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane :key="1001">
              <span slot="tab">
                <a-icon type="smile" />
                华语男歌手
              </span>
              <div class="artists-list">
                <div class='artists-item' v-for='(item, key) in artistList' :key='key'>
                  <a-avatar :src="item.picUrl" class='artists-songer'></a-avatar>
                  <div class='artists-name'>{{item.name}}</div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane :key="1002">
              <span slot="tab">
                <a-icon type="smile" />
                华语女歌手
              </span>
              <div class="artists-list">
                <div class='artists-item' v-for='(item, key) in artistList' :key='key'>
                  <a-avatar :src="item.picUrl" class='artists-songer'></a-avatar>
                  <div class='artists-name'>{{item.name}}</div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane :key="1003">
              <span slot="tab">
                <a-icon type="smile" />
                华语组合/乐队
              </span>
              <div class="artists-list">
                <div class='artists-item' v-for='(item, key) in artistList' :key='key'>
                  <a-avatar :src="item.picUrl" class='artists-songer'></a-avatar>
                  <div class='artists-name'>{{item.name}}</div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane :key="2001">
              <span slot="tab">
                <a-icon type="smile" />
                欧美男歌手
              </span>
              <div class="artists-list">
                <div class='artists-item' v-for='(item, key) in artistList' :key='key'>
                  <a-avatar :src="item.picUrl" class='artists-songer'></a-avatar>
                  <div class='artists-name'>{{item.name}}</div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane :key="2002">
              <span slot="tab">
                <a-icon type="smile" />
                欧美女歌手
              </span>
              <div class="artists-list">
                <div class='artists-item' v-for='(item, key) in artistList' :key='key'>
                  <a-avatar :src="item.picUrl" class='artists-songer'></a-avatar>
                  <div class='artists-name'>{{item.name}}</div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script >
import { getArtistList } from "api";
export default {
  name: "Artists",
  components: {
  },
  data() {
    return {
      artistList: [],
      spinning: false,
      tab: 5001
    };
  },
  activated() {
    this.getArtist();
  },
  methods: {
    async getArtist(val) {
      this.spinning = true;
      const data = await getArtistList(val)
      if (data.data.code === 200) {
        this.artistList = data.data.artists;
      } else {
        this.$message.error('网络错误')
      }
      this.spinning = false;
    },
    async changeType(val) {
      console.log(val)
      this.tab = val;
      this.getArtist(val);
    }
  }
};
</script>

<style lang="less" scoped>
.artists {
  width: 1500px;
  height: 70vh;
  margin: 0 auto;
  overflow: auto;
  .artists-title {
    font-size: @font_size_large_x;
    font-weight: bold;
    line-height: 40px;
    margin-top: 2%;
  }
  .artists-content {
    width: 1000px;
    height: 70vh;
    margin: 0 auto;
    .artists-list {
      .artists-item {
        display: inline-block;
        width: 18%;
        .artists-name {
          margin: 10px;
        }
        .artists-songer {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>
