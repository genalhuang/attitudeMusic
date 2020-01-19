<template>
  <div id="atm">
    <atm-header />
    <router-view />
  </div>
</template>
<script>
import AtmHeader from "components/atm-header/atm-header.vue";
import { saveUserInfo, saveHistoryList } from 'utils/userinfo.js'
export default {
  components: {
    AtmHeader
  },
  created() {
    saveUserInfo();
    saveHistoryList();
  },
  mounted() {
    window.onbeforeunload = () => {      //刷新时弹出提示
      this.$router.push({path: '/'});
    };
  }
};
</script>
<style lang="less" scoped>
#atm {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: @font_size_large;
  color: #2c3e50;
}
</style>
