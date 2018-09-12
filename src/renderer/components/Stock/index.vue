<template>
  <div class="mainGrid">
    <HeaderBar
      :amount="amount" :selected="selected"
      :newItem="newItem" :routes="buttonRoutes" />
    <Table
      :amount="amount" :selected="selected"
      :newItem="newItem" :routes="buttonRoutes" />
  </div>
</template>

<script>
import HeaderBar from "./HeaderBar.vue";
import Table from "./Table.vue";
import { mapState } from "Vuex";
import { products as types } from "../../store/vuexTypes";

export default {
  name: "products-page",
  components: {
    HeaderBar,
    Table
  },
  created() {
    this.$store.dispatch(types.load);
  },
  data: () => ({
    newItem: {
      _id: undefined,
      name: null,
      price: null,
      stock: 0
    },
    amount: {},
    selected: {},
    buttonRoutes: {
      default: 1,
      more: 2,
      createItem: 3,
      deleteItems: 4,
      editItems: 5,
      inStock: 6,
      outStock: 7
    }
  }),
  computed: mapState({
    data: state => state.Products.data,
    isLoading: state => state.Products.loading,
    showSpinner: state => state.Products.showSpinner
  })
};
</script>

<style lang="scss" scoped>
.mainGrid {
  width: 100%;
  height: 100%;
  display: grid;
  padding: 30px 45px 41.5px 45px;
  grid-row-gap: 18px;
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "table";
  overflow: scroll;
}
</style>