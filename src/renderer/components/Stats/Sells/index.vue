<template>
  <div class="indexGrid">
    <Table/>
    <Sidebar/>
  </div>
</template>

<script>
import Table from "./Table.vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "sells",
  components: {
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
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  grid-template-areas: "table sidebar";
  overflow: hidden;
  padding: 20px 40px 40px 40px;
}
</style>