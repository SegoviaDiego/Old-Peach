<template>
  <div class="grid">
    <div class="navtabs">
      <div class="tabs">
        <router-link to="/informes" class="tab">
          Informes
        </router-link>
        <!-- <router-link to="/sells" class="tab">
          Ventas
        </router-link> -->
        <router-link to="/movimientos" class="tab">
          Movimientos
        </router-link>
        <router-link to="/ingresos" class="tab">
          Ingresos
        </router-link>
        <router-link to="/egresos" class="tab">
          Egresos
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import {
  clearSales,
  createSell,
  getTotals
} from "../../store/backendish/Server/Firebird";

export default {
  name: "stats-page",
  data: () => ({
    loading: false
  }),
  methods: {
    async clear() {
      if (!this.loading) {
        this.loading = true;
        await clearSales();
        console.log(await getTotals());
        this.loading = false;
      }
    },
    async sell() {
      if (!this.loading) {
        this.loading = true;
        await createSell();
        console.log((await getTotals())[0]["CA"]);
        this.loading = false;
      }
    }
  }
  // data: () => ({
  //   weekSales: [2300, 1477, 1600, 1788, 1500, 2000, 2700],
  //   days: [
  //     "Domingo",
  //     "Lunes",
  //     "Martes",
  //     "Miercoles",
  //     "Jueves",
  //     "Viernes",
  //     "Sabado"
  //   ],
  //   borderColor: [
  //     "rgba(255,99,132,1)",
  //     "rgba(54, 162, 235, 1)",
  //     "rgba(255, 206, 86, 1)",
  //     "rgba(75, 192, 192, 1)",
  //     "rgba(153, 102, 255, 1)",
  //     "rgba(255, 159, 64, 1)",
  //     "rgba(255, 159, 255, 1)"
  //   ],
  //   backgroundColor: [
  //     "rgba(255, 99, 132, 0.2)",
  //     "rgba(54, 162, 235, 0.2)",
  //     "rgba(255, 206, 86, 0.2)",
  //     "rgba(75, 192, 192, 0.2)",
  //     "rgba(153, 102, 255, 0.2)",
  //     "rgba(255, 159, 64, 0.2)",
  //     "rgba(255, 159, 255, 0.2)"
  //   ]
  // }),
  // mounted() {
  //   var chart = this.$refs.chart;
  //   var ctx = chart.getContext("2d");
  //   var myChart = new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: this.days,
  //       datasets: [
  //         {
  //           label: "Ventas",
  //           data: this.weekSales,
  //           backgroundColor: this.backgroundColor,
  //           borderColor: this.borderColor,
  //           borderWidth: 1
  //         }
  //       ]
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: true
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 48px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "navtabs" "content";
  overflow: hidden;
  .navtabs {
    grid-area: navtabs;
  }
  .content {
    grid-area: content;
    position: relative;
    overflow: hidden;
  }
}
</style>