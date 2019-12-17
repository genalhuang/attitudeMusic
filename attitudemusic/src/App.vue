<template>
  <div id="atm">
    <at-header />
    <router-view />
  </div>
</template>
<script>
import AtHeader from "components/at-header/at-header.vue";
export default {
  components: {
    AtHeader
  },
  mounted() {
    window.onbeforeunload = () => {      //刷新时弹出提示
      this.$router.push({path: '/'})
      alert('234')
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
