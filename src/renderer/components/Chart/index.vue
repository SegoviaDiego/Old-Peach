<template>
  <div class="grid">
    <div class="dailySells">
       <canvas ref="chart"></canvas>
    </div>
    <div class="monthlySells">
      <button @click="clear()">Clear</button>
      <button @click="sell()">Fake sell</button>
    </div>
    <div class="topProds">
      asdsadfas
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
  name: "products-page",
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

<style lang="css" scoped>
.grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "dailySells" "monthlySells" "topProds";
  overflow: hidden;
}
</style>