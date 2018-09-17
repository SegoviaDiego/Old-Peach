<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { products as types } from "./store/vuexTypes";

export default {
  name: "oxyrest",
  created() {
    this.$store.dispatch(types.syncToSystel);
  }
};
</script>

<style lang="scss" scoped>
#app {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}
</style>
