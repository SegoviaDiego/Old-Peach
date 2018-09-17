<template>
  <div class="navbar">
    <div class="routes">
      asdasd
      <router-link to="/dashboard" class="button dashboard">
        <fontawesome icon="calendar-check" />
      </router-link>
      <router-link to="/stock" class="button stock">
        <fontawesome icon="box-open" />
      </router-link>
      <router-link to="/charts" class="button charts">
        <fontawesome icon="signature" />
      </router-link>
      <router-link to="/charts" class="button settings">
        <fontawesome icon="cog" />
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
  position: relative;
  overflow: hidden;
  background-color: #e1e2e1;
  .routes {
    height: 100%;
    display: grid;
    grid-template-rows: 0.35fr 65px 65px 65px 65px;
    grid-template-columns: 1fr;
    grid-template-areas: "blank" "dashboard" "stock" "charts" "settings";
    grid-gap: 17px;

    .button {
      height: 65px;
      margin-bottom: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 48px;
      transition: 300ms;
      svg {
        transition: .5s;
      }
      &:hover, &.router-link-active {
        svg {
          color: black;
        }
        background-color: #fdd835;
      }
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
    .settings {
      grid-area: settings;
      background-color: #3D3D3D;
    }
  }
}
</style>