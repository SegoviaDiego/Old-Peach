<template>
  <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Imprimir</md-dialog-title>

      <md-content>
        Guardar Stock como pdf
      </md-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('close-print-dialog')">Cerrar</md-button>
        <md-button class="md-primary" @click="print()">Imprimir</md-button>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
import { mapState } from "Vuex";
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfVfs = require("pdfmake/build/vfs_fonts.js");

export default {
  name: "print-dialog",
  props: {
    showDialog: Boolean
  },
  computed: mapState({
    data: state => state.Products.data
  }),
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
    printStock() {
      console.log(1);
    },
    printSells() {
      console.log(2);
    },
    printOuts() {
      console.log(3);
    }
  },
  data: () => ({
    activeTab: "1"
  })
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
</style>