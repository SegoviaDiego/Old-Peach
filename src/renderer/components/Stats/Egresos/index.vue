<template>
  <div class="indexGrid">
    <Topbar/>
    <Table/>
  </div>
</template>

<script>
import Topbar from "./Topbar.vue";
import Table from "./Table.vue";

export default {
  name: "informes",
  components: {
    Topbar,
    Table
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.indexGrid {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "topbar" "table";
  overflow: hidden;
  padding: 20px 40px;
}
</style>