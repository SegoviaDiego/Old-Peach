<template>
  <div class="indexGrid">
    <Table/>
  </div>
</template>

<script>
import Table from "./Table.vue";

export default {
  name: "informes",
  components: {
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
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "table";
  overflow: hidden;
  padding: 20px 40px;
}
</style>