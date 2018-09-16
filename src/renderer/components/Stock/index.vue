<template>
  <div class="mainGrid">
    <HeaderBar
      v-on:go-to="goTo" v-on:print="print"
      :amount="amount" :selected="selected" :changes="changes"
      :newItem="newItem" :routes="routes" />
    <Table
      v-on:input-stock="handleInputStock"
      v-on:edit-item-value="handleEditItemValue"
      :amount="amount" :selected="selected" :changes="changes"
      :newItem="newItem" :routes="routes" />
  </div>
</template>

<script>
import HeaderBar from "./HeaderBar.vue";
import Table from "./Table.vue";
import { mapState } from "Vuex";
import { products as types } from "../../store/vuexTypes";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfVfs = require("pdfmake/build/vfs_fonts.js");

export default {
  name: "products-page",
  components: {
    HeaderBar,
    Table
  },
  methods: {
    print() {
      let printData = [];
      printData.push(["PLU", "NOMBRE", "EN STOCK"]);

      for (let item of this.data) {
        printData.push([item._id, item.name, item.stock]);
      }

      pdfMake.vfs = pdfVfs.pdfMake.vfs;
      pdfMake.fonts = {
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-Italic.ttf"
        }
      };
      pdfMake
        .createPdf({
          content: [
            {
              table: {
                headerRows: 1,
                dontBreakRows: true,
                keepWithHeaderRows: 1,
                widths: ["10%", "50%", "40%"],
                body: printData
              }
            }
          ]
        })
        .download();
    },
    goTo(route, from) {
      this.$store.dispatch(types.buttons, route);
      if (from)
        switch (from) {
          case this.routes.createItem:
            this.newItem = {
              _id: undefined,
              name: null,
              price: null,
              stock: 0
            };
            break;
          case this.routes.editItems:
            this.changes = {};
            break;
          case this.routes.deleteItems:
            this.selected = {};
            break;
          case this.routes.inStock:
          case this.routes.outStock:
            this.amount = {};
            break;
        }
    },
    handleInputStock(_id, amount) {
      this.amount[_id] = amount;
    },
    handleEditItemValue(_id, att, value) {
      this.changes[_id][att] = value;
    }
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
    outType: undefined,
    selected: {},
    changes: {},
    routes: {
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
    showSpinner: state => state.Products.showSpinner,
    route: state => state.Products.buttonRoute
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
</style>