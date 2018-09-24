<template>
  <div class="indexGrid">
    <Toolbar/>
    <Table/>
    <Sidebar/>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Table from "./Table.vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "informes",
  components: {
    Toolbar,
    Table,
    Sidebar
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
  grid-template-columns: 3fr 1fr;
  grid-template-areas: "toolbar toolbar" "table sidebar";
  overflow: hidden;
  padding: 20px 40px;
}
</style>