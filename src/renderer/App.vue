<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { products as types } from "./store/vuexTypes";
import {
  listenForChanges,
  isSrcReady
} from "./store/backendish/server/Firebird.js";

export default {
  name: "oxyrest",
  mounted() {
    this.$store.dispatch(types.syncToSystel);
    setTimeout(() => {
      listenForChanges();
    }, 1000);
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
