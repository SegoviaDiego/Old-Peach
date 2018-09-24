<template>
  <div class="grid">
    <Toolbar/>
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
      <template v-for="sell in filteredData">
        <div :key="sell._id" class="row">
          <div class="column">
            {{ products.get(sell._productId).name }}
          </div>
          <div class="column">
            {{ products.get(sell._productId).price }}
          </div>
          <div class="column">
            {{ (sell.amount % 1 == 0) ? sell.amount : (sell.amount).toFixed(3) }}
          </div>
          <div class="column">
            {{ (sell.money % 1 == 0) ? sell.money : (sell.money).toFixed(2) }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import { mapState } from "Vuex";
import { sells as types } from "../../../store/vuexTypes";

export default {
  name: "informes-table",
  components: {
    Toolbar
  },
  mounted() {
    this.$store.dispatch(types.load);
  },
  data: () => ({
    openPrintDialog: false
  }),
  computed: mapState({
    filter: state => state.Sells.filter,
    isLoading: state => state.Sells.loading,
    showSpinner: state => state.Sells.showSpinner,
    filteredData(state) {
      return this.sortData(this.filterData([...state.Sells.data]));
    },
    products(state) {
      return this.toMap([...state.Products.data]);
    }
  }),
  methods: {
    closePrintDialog() {
      this.openPrintDialog = false;
    },
    print() {
      this.openPrintDialog = true;
    },
    toMap(data) {
      const res = new Map();
      for (let index in data) {
        res.set(data[index]._id, data[index]);
      }
      return res;
    },
    addKeyValues(obj) {
      let values = this.products.get(obj._productId).name + "";
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
  grid-template-rows: 70px 50px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "toolbar" "head" "body";
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