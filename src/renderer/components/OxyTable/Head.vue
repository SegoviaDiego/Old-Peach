<template>
  <div class="Head">
    <div
      v-for="item in titles"
      :key="item.id + '-tableTitle'"
      class="title"
      :style="`flex: ${item.flex} !important;`"
    >
      <div v-show="false" class="sortIcon">
        <md-icon>arrow_upward</md-icon>
      </div>
      <div class="titleText">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'row-table',
    props: {
      titles: Array,
    }
  }
</script>

<style lang="scss" scoped>
$IdSize: 1;
$NameSize: 3;
$StockSize: 3;
$PriceSize: 3;
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
}
</style>