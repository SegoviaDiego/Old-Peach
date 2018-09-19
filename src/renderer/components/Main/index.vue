<template>
  <div class="grid">
    <Header class="header" />
    <Navbar class="nav" />
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";
import Navbar from "./navbar.vue";
import Updater from "../Updater/index.vue";

export default {
  name: "app-main",
  components: {
    Header,
    Navbar,
    Updater
  },
  mounted() {
    this.$router.push("/charts");
  }
};
</script>

<style lang="scss" scoped>
.grid {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 76px 9fr;
  grid-template-columns: 68px 2fr 1fr;
  grid-template-areas:
    "header     header  header"
    "navigation content content";
  overflow: hidden;
}
.header {
  grid-area: header;
}
.nav {
  grid-area: navigation;
}
.content {
  grid-area: content;
  position: relative;
  background-color: white;
  overflow: hidden;
}
</style>