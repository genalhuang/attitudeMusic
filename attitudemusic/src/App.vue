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
  }
};
</script>
<style lang="less" scoped>
#atm {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
