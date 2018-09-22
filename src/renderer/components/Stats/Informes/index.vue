<template>
  <div class="grid">
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
.grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "toolbar toolbar" "table sidebar";
  overflow: hidden;
  padding: 10px 20px;
}
</style>