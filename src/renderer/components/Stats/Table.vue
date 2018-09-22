<template>
  <div>
    <md-table
      v-model="filteredData"
      class="table"
      :md-sort.sync="currentSort"
      :md-sort-order.sync="currentSortOrder"
      :md-sort-fn="customSort"
      md-card md-fixed-header>
        <!-- Head - Toolbar  -->
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Productos</h1>
          </div>

          <md-field v-if="!isLoading"
          md-clearable class="md-toolbar-section-end">
            <md-input
            v-model="filter"
            placeholder="Buscar productos..." />
          </md-field>
        </md-table-toolbar>
        <!-- Head - Toolbar  -->
        <!-- Empty State -->
        <md-table-empty-state v-if="isLoading">
            <div v-if="showSpinner" class="loadingFlex">
              <div>
                <md-progress-spinner
                md-mode="indeterminate"/>
              </div>
              <p>Cargando</p>
            </div>
        </md-table-empty-state>
        <md-table-empty-state v-else-if="!isFiltered()"
          md-label="Lista vacia"
          md-icon="error_outline"
          md-description="Aún no se han creado productos."
          md-rounded>
        </md-table-empty-state>
        <md-table-empty-state v-else-if="isFiltered()"
          md-label="Producto no encontrado"
          md-icon="search"
          :md-description="
          `No se encontró un producto que contenga
          '${filter}' en sus datos. Prueba con otra palabra.`"
          md-rounded>
        </md-table-empty-state>
        <!-- Empty State -->
        <!-- Rows -->
        <md-table-row
          slot="md-table-row" slot-scope="{ item }">
            <md-table-cell
              md-label="ID" md-sort-by="id" md-numeric>
                {{ item.id }}
            </md-table-cell>
            <md-table-cell
              md-label="Nombre" md-sort-by="name">
                {{ item.name }}
            </md-table-cell>
            <md-table-cell
              md-label="Stock" md-sort-by="stock">
                {{ item.stock }}
            </md-table-cell>
            <md-table-cell
              md-label="Precio" md-sort-by="price" md-numeric>
                {{ item.price }}
            </md-table-cell>
        </md-table-row>
        <!-- Rows -->
      </md-table>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { products as types } from "../../store/vuexTypes";

function toLower(text) {
  return text.toString().toLowerCase();
}

function rowToString(row) {
  let res = "";
  for (let key in row) {
    res += toLower(row[key]);
  }
  return res;
}

export default {
  name: "products-table",
  methods: {
    filterData(data, filter) {
      if (!this.isFiltered()) return [...data];
      return data.filter(row => rowToString(row).includes(toLower(filter)));
    },
    isFiltered() {
      return this.filter != null && this.filter.trim() != "";
    },
    customSort(data) {
      const sortBy = this.currentSort;
      return data.sort((a, b) => {
        if (sortBy == "id" || sortBy == "stock" || sortBy == "price") {
          if (this.currentSortOrder === "asc")
            return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
          return parseFloat(b[sortBy]) - parseFloat(a[sortBy]);
        }
        if (this.currentSortOrder === "asc")
          return a[sortBy].localeCompare(b[sortBy]);
        return b[sortBy].localeCompare(a[sortBy]);
      });
    }
  },
  mounted() {
    this.$store.dispatch(types.load);
    this.$store.dispatch(types.startRealTime);
    setTimeout(() => {
      this.showSpinner = true;
    }, 300);
  },
  beforeDestroy() {
    this.$store.dispatch(types.stopRealTime);
  },
  computed: mapState({
    filteredData(state) {
      return this.filterData(state.Products.data, this.filter);
    },
    isLoading: state => state.Products.loading
  }),
  data: () => ({
    //loading
    showSpinner: false,
    //sorting
    currentSort: "id",
    currentSortOrder: "asc",
    //other
    filter: null
  })
};
</script>

<style lang="css" scoped>
.loadingFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.loadingFlex p {
  font-size: 20px;
}
.table {
  -webkit-user-select: none;
  user-select: none;
}
.md-field {
  max-width: 300px;
}
</style>