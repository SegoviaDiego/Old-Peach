<template>
  <div class="wrapper">
    <Table
      :data="data"
      :titles="titles"
      :isLoading="isLoading"
      :showSpinner="showSpinner"
    />

    <div class="testBtn">
      <div>
        <md-button
          class="md-raised md-primary"
          @click="print">
            imprimir stock
        </md-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import {products as types} from '../../store/vuexTypes';
  import Table from '../OxyTable/index.vue';

  const pdfMake = require('pdfmake/build/pdfmake.js');
  const pdfVfs = require('pdfmake/build/vfs_fonts.js');

  export default {
    name: 'products-page',
    components: {
      Table,
    },
    methods: {
      print(){
        let printData = [];
        printData.push(['PLU', 'NOMBRE', 'EN STOCK']);
        for(let item of this.data){
          printData.push([
            item.id,
            item.name,
            item.stock
          ]);
        }

        pdfMake.vfs = pdfVfs.pdfMake.vfs;
        pdfMake.fonts = {
          Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf'
          }
        }
        pdfMake.createPdf({
          content: [
            {
              table: {
                headerRows: 1,
                dontBreakRows: true,
                keepWithHeaderRows: 1,
                widths: [ '10%', '50%', '40%',],
                body: printData
              }
            }
          ]
        }).download();
      }
    },
    created () {
      this.$store.dispatch(types.load);
    },
    data: () => ({
      titles: [
          {
            id: 1,
            label: 'Id',
            flex: 1
          },
          {
            id: 2,
            label: 'Nombre',
            flex: 3
          },
          {
            id: 3,
            label: 'Stock',
            flex: 3
          },
          {
            id: 4,
            label: 'Precio',
            flex: 3
          },
        ]
    }),
    computed: mapState({
      data: state => state.Products.data,
      isLoading: state => state.Products.loading,
      showSpinner: state => state.Products.showSpinner
    }),
  }
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  background-color: #d8dfe2;
  padding: 20px 7%;
  height: 100%;
  width: 100%;
}
.testBtn {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
}
</style>