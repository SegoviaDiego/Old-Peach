<template>
  <div class="table">
    <div class="header">
      <div class="column">
        Codigo
      </div>
      <div class="column">
        Producto
      </div>
      <div class="column">
        Precio
      </div>
      <div class="column">
        Cantidad
      </div>
    </div>
    <div class="body">
      
      <div
        v-for="n in 30"
        :key="n"
        class="row">
        <div class="column">
          {{n}}
        </div>
        <div class="column">
          Pan
        </div>
        <div class="column">
          20$
        </div>
        <div class="column">
          500kg
        </div>
      </div>
      
    </div>
    <div class="background">
      <div class="header"/>
      <div class="body">
        <div class="column darker"></div>
        <div class="column"></div>
        <div class="column darker"></div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "products-table"
};
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  grid-area: table;
  $fontColor: #000;

  display: grid;
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 1fr;

  .header {
    grid-area: header;
    z-index: 2;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 3fr;
    .column {
      display: flex;
      padding-left: 10px;
      align-items: center;
      color: $fontColor;
      font-size: 28px;
      font-family: Lato;
      font-weight: bold;
    }
  }
  .body {
    grid-area: body;
    z-index: 2;
    .row {
      $h: 30px;
      height: $h;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr 1fr 3fr;
      .column {
        display: flex;
        flex-grow: 1;
        padding-left: 10px;
        align-items: center;
        color: $fontColor;
        font-size: $h - 5px;
        font-family: Lato;
        font-weight: bold;
      }
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(225, 226, 225, 0.36);
    display: flex;
    flex-direction: column;
    .header {
      flex: 1;
      background-color: #e1e2e1;
    }
    .body {
      flex: 9;
      display: flex;
      flex-direction: row;
      .column {
        flex: 1;
      }
      .column:nth-of-type(4) {
        flex: 3;
      }
      .darker {
        background-color: rgba(225, 226, 225, 0.56);
      }
    }
  }
}
</style>