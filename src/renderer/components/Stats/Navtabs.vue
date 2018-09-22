<template>
  <div class="navtabs">
     <md-tabs md-sync-route class="md-transparent" md-alignment="fixed">
      <md-tab id="tab-informes" md-label="Informes" to="/informes"/>
      <md-tab id="tab-sells" md-label="Ventas" to="/sells"/>
      <md-tab id="tab-charts" md-label="Movimientos" to="/movimientos"/>
      <md-tab id="tab-ingresos" md-label="Ingresos" to="/ingresos"/>
      <md-tab id="tab-egresos" md-label="Egresos" to="/egresos"/>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: "chart-navtabs"
};
</script>

<style lang="scss" scoped>
.navtabs {
  grid-area: navtabs;
}
</style>