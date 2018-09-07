<template>
  <div class="mainGrid">
    <HeaderBar />
    <Table />
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
  overflow: hidden;
}
.header {
  grid-area: header;
  display: grid;
  grid-template-rows: 71px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "searchbar buttons";
  .searchbar {
    position: relative;
    grid-area: searchbar;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #e1e2e1;
    padding: 0px 41px;
    .input {
      flex: 8;
    }
    .icon {
      flex: 2;
    }
    .yellowRectangle {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background-color: #fdd835;
      border-bottom-left-radius: 60px;
      border-top-right-radius: 60px;
    }
  }
  .buttons {
    background-color: red;
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>