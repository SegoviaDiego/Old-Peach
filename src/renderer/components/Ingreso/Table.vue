<template>
  <div class="Table">
    <div class="Head">
      <div
        v-for="item in titles"
        :key="item.id + '-tableTitle'"
        class="title" :id="`title${item.id}`">
        <div v-show="false" class="sortIcon">
          <md-icon>arrow_upward</md-icon>
        </div>
        <div class="titleText">
          {{item.label}}
        </div>
      </div>
    </div>
    <md-content class="Body md-scrollbar"
    :style="`${
        (isLoading && showSpinner) ?
        'overflow:hidden !important;' : '' }`">
      <div
        v-if="isLoading && showSpinner"
        class="loadingFlex">
        <div class="loadingSpinner">
          <md-progress-spinner
          md-mode="indeterminate"/>
        </div>
        <div class="loadingText">
          Cargando
        </div>
      </div>
      <Row
        v-for="item in data"
        :item="item" :editable="editable"
        :setInput="setInput"
        :key="item.id + '-productRow'" />
    </md-content>
  </div>
</template>

<script>
  import Row from './Row.vue';

  function toLower(text){
    return text.toString().toLowerCase();
  }

  function rowToString(row) {
    let res = '';
    for(let key in row){
      res += toLower( row[key] );
    }
    return res;
  }

  export default {
    name: 'products-table',
    components: {
      Row
    },
    methods: {
      filterData(data, filter) {
        if(!this.isFiltered()) return [...data];
        return data.filter(
            row => (
              rowToString(row)
                .includes(toLower(filter))
            )
          );
      },
      isFiltered() {
        return (
          this.filter != null &&
          this.filter.trim() != ''
        );
      },
      customSort(data) {
        const sortBy = this.currentSort
        return data.sort((a, b) => {
          if(
            sortBy == 'id' ||
            sortBy == 'stock' ||
            sortBy == 'price'){
            if (this.currentSortOrder === 'asc')
              return parseFloat(a[sortBy]) - parseFloat(b[sortBy])
            return parseFloat(b[sortBy]) - parseFloat(a[sortBy])
          }
          if (this.currentSortOrder === 'asc')
            return a[sortBy].localeCompare(b[sortBy])
          return b[sortBy].localeCompare(a[sortBy])
        })
      },
    },
    props: {
      data: null,
      editable: Boolean,
      inputArray: {},
      isLoading: Boolean,
      showSpinner: Boolean,
      setInput: Function
    },
    computed: {
      titles() {
        return [
          {
            id: 1,
            label: 'id'
          },
          {
            id: 2,
            label: 'Nombre'
          },
          {
            id: 3,
            label: 'Stock'
          },
          {
            id: 4,
            label: this.editable ?
              'Cantidad' : 'Precio'
          },
        ];
      }
    },
    data: () => ({
      //sorting
      currentSort: 'id',
      currentSortOrder: 'asc',
      //other
      filter: null
    }),
  }
</script>

<style lang="scss" scoped>
@import '~lato-font/css/lato-font.css';

$IdSize: 1;
$NameSize: 3;
$StockSize: 3;
$PriceSize: 3;

.Table {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-radius: 7px;
  background-color: #fefefe;
  -webkit-user-select: none;
  .Head {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 4px solid #e2e4e5;
    font-family: Lato;
    font-weight: 900;
    margin-right: 8px;
    .title {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border-radius: 3px;
      transition: 200ms;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
      .sortIcon {
        width: 24px;
      }
      .titleText {
        padding-left: 10px;
        flex: 9;
        display: flex;
        align-items: center;
      }
    }
    /*ID*/
    #title1 {
      flex: $IdSize;
    }
    /*NAME*/
    #title2 {
      flex: $NameSize;
    }
    /*STOCK*/
    #title3 {
      flex: $StockSize;
    }
    /*PRICE / INOUTS*/
    #title4 {
      flex: $PriceSize;
    }
  }
  .Body {
    flex: 9;
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: Lato;
    font-weight: 500;
    font-size: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    .loadingFlex {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      .loadingText {
        margin-top: 20px;
      }
    }
  }
}
</style>