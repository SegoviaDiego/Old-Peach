<template>
  <div class="navbar">
    <div class="routes">
      <router-link to="/dashboard" class="dashboard">
        <fontawesome icon="calendar-check" />
      </router-link>
      <router-link to="/stock" class="stock">
        <fontawesome icon="box-open" />
      </router-link>
      <router-link to="/charts" class="charts">
        <fontawesome icon="signature" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-navbar",
  methods: {}
};
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  background-color: #e1e2e1;
}
.routes {
  display: grid;
  grid-template-rows: 65px 65px 65px;
  grid-template-columns: 1fr;
  grid-template-areas: "dashboard" "stock" "charts";
  grid-gap: 17px;
  .dashboard,
  .stock,
  .charts {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 48px;
  }
  .dashboard {
    grid-area: dashboard;
    background-color: #ff8a50;
  }
  .stock {
    grid-area: stock;
    background-color: #ff5722;
  }
  .charts {
    grid-area: charts;
    background-color: #c41c00;
  }
}
</style>