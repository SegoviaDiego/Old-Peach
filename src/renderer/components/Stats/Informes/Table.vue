<template>
  <div class="grid">
    <div class="head">
      <div class="column">
        Articulo
      </div>
      <div class="column">
        Precio
      </div>
      <div class="column">
        Cantidad
      </div>
      <div class="column">
        Total
      </div>
    </div>
    <div class="body" v-loading="isLoading">
      <template v-if="cierreIndex == null">
        No has seleccionado un cierre
      </template>
      <template v-else-if="cierre.length <= 0">
        No se realizaron ventas el dia seleccionado
      </template>
      <template v-else v-for="total in cierre">
        <div :key="total._id" class="row">
          <div class="column">
            {{products[total._id].name}}
          </div>
          <div class="column">
            $ {{products[total._id].price}}
          </div>
          <div class="column">
            {{total.amount}} Kg
          </div>
          <div class="column">
            $ {{total.money}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { totals as types } from "../../../store/vuexTypes";
import _ from "lodash";

export default {
  name: "informes-table",
  data: () => ({
    totalIndex: types.totalIndex,
    openPrintDialog: false
  }),
  computed: mapState({
    products: state => state.Products.data,
    filter: state => state.Totals.filter,
    isLoading: state => state.Totals.loading,
    current: state => state.Totals.data,
    cierreIndex: state => state.Totals.cierreIndex,
    cierre(state) {
      if (this.cierreIndex == this.totalIndex)
        return this.getTotal(this.current.cierres);
      if (this.current && this.current.cierres)
        if (this.current.cierres.length >= this.cierreIndex)
          return this.current.cierres[this.cierreIndex - 1].data;
      return [];
    },
    filteredData(state) {
      return this.sortData(this.filterData([...this.cierre]));
    }
  }),
  methods: {
    getTotal() {
      let total = {};
      for (let cierre of this.current.cierres) {
        for (let item of cierre.data) {
          total[item._id] = item;
        }
      }
      return total;
    },
    closePrintDialog() {
      this.openPrintDialog = false;
    },
    print() {
      this.openPrintDialog = true;
    },
    addKeyValues(obj) {
      let values = "";
      for (let val of Object.values(obj)) {
        values += val;
      }
      return values.toLowerCase();
    },
    filterData(data) {
      return data.filter(item => {
        return this.addKeyValues(item).includes(this.filter.toLowerCase());
      });
    },
    sortData(data) {
      return data.sort((a, b) => {
        switch (this.type) {
          case 1:
            return parseInt(a._id) - parseInt(b._id);
            break;
          case 2:
            return a.name.localeCompare(b.name);
            break;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// Scrollbar
$sbSize: 10px;
// Grid
$tableColumnTemplate: 2fr 1fr 1fr 1fr;
// Head options
$hFontColor: #000;
$hFontSize: 20px;
// Body options
$bFontSize: 17px;
$bFontColor: #a0a0a0;

.grid {
  padding: 10px;
  grid-area: table;
  display: grid;
  grid-template-rows: 50px 9fr;
  grid-template-columns: 1fr;
  grid-template-areas: "head" "body";
  overflow: hidden;
  background-color: #eeeeee;
  border-radius: 7px;
  .head {
    margin-right: $sbSize;
    grid-area: head;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: $tableColumnTemplate;
    .column {
      display: flex;
      padding-left: 10px;
      align-items: center;
      color: $hFontColor;
      font-size: $hFontSize;
      font-family: Lato;
      font-weight: bold;
      overflow: hidden;
    }
  }
  .body {
    grid-area: body;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-bottom: 10px;
    &::-webkit-scrollbar {
      width: $sbSize;
    }
    &::-webkit-scrollbar-track {
      background-color: #e1e2e1;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: $bFontColor;
      border-radius: 10px;
    }
    .row {
      margin: 7px 0px;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: $tableColumnTemplate;
      .column {
        overflow: hidden;
        display: flex;
        padding: 0 $sbSize;
        color: $bFontColor;
        font-size: $bFontSize;
        font-family: Lato;
        font-weight: bold;
      }
    }
  }
}
</style>