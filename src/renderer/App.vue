<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import initServer from "./store/backendish/server/Server.js";

export default {
  name: "oxyrest",
  mounted() {
    initServer(this.$store.dispatch);
  }
};
</script>

<style lang="scss">
#app {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

html {
  overflow: hidden;
  button {
    outline: none;
  }
}
</style>
