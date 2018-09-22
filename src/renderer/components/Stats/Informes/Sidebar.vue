<template>
  <div class="grid">
    asd
  </div>
</template>

<script>
export default {
  name: "informes-sidebar",
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.grid {
  grid-area: sidebar;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "info buttons";
  overflow: hidden;
  .info {
  }
  .buttons {
  }
}
</style>