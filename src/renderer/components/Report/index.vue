<template>
  <div class="wrapper">
    <Table/>
  </div>
</template>

<script>
  import Table from './Table.vue';

  export default {
    name: 'products-page',
    components: {
      Table
    }
  }
</script>

<style lang="css" scoped>
.wrapper {
  padding: 3%;
}
</style>