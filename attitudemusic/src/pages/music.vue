<template>
  <div class="music">
    <top-tab />
    <div class="music-content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <atm-player />
  </div>
</template>

<script>
import TopTab from "components/top-tab/top-tab.vue";
import AtmPlayer from "components/atm-player/atm-player.vue";
export default {
  name: "Music",
  components: {
    TopTab,
    AtmPlayer
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.music {
  background-image:url('../assets/logo.png');
  .music-content {
    // overflow: hidden;
    height: 70vh;
  }
}
</style>
