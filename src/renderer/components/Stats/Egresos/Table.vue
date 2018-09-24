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
    <div class="body">
      <template v-for="i in 50">
        <div :key="'row-' + i" class="row">
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
      </template>
    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import { mapState } from "Vuex";
import { totals as types } from "../../../store/vuexTypes";

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
    filter: state => state.Totals.filter,
    isLoading: state => state.Totals.loading,
    showSpinner: state => state.Totals.showSpinner,
    filteredData(state) {
      return this.sortData(this.filterData([...state.Totals.data]));
    }
  }),
  methods: {
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