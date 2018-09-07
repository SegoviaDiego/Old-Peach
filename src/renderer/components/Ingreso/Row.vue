<template>
  <div class="Row">
    <div class="column">
      <span>
        {{item.id}}
      </span>
    </div>
    <div class="column">
      <span>
        {{item.name}}
      </span>
    </div>
    <div class="column">
      <span>
        {{item.stock}}
      </span>
    </div>
    <div class="column">
      <div v-if="editable" class="inputContainer">
        <md-field>
          <md-input
            @input="val => 
              setInput(item.id, val)"
            placeholder="Ingreso" type="number"
            min="0" step="0.01"/>
        </md-field>
      </div>
      <div v-else>
        <span>
          {{item.price}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'row-table',
    props: {
      item: null,
      editable: Boolean,
      setInput: Function
    }
  }
</script>

<style lang="scss" scoped>
$IdSize: 1;
$NameSize: 3;
$StockSize: 3;
$PriceSize: 3;
.Row {
  display: flex;
  height: 50px !important;
  min-height: 50px !important;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #e2e4e5;
  transition: 300ms;
  &:hover {
    background-color: #eee;
  }
  .column {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    span:first-child {
      padding-left: 20px;
    }
  }
  /*ID*/
  div:nth-child(1) {
    flex: $IdSize;
  }
  /*NAME*/
  div:nth-child(2) {
    flex: $NameSize;
  }
  /*STOCK*/
  div:nth-child(3) {
    flex: $StockSize;
  }
  /*PRICE / INOUTS*/
  div:nth-child(4) {
    flex: $PriceSize;
  }
  .inputContainer {
    display: flex;
    padding: 20px;
  }
}
</style>