<template>
  <div class="Table">
    <Head :titles="titles" />
    <Body
      :data="data"
      :editable="editable"
      :isLoading="isLoading"
      :showSpinner="showSpinner"
      :setInput="setInput"
    />
  </div>
</template>

<script>
  import Head from './Head.vue';
  import Body from './Body.vue';

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
      Head,
      Body
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
      titles: Array,
      editable: Boolean,
      inputArray: {},
      isLoading: Boolean,
      showSpinner: Boolean,
      setInput: Function,
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
  user-select: none;
}
</style>