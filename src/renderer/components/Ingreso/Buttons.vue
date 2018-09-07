<template>
  <div class="buttons">
    <div v-on:click="egresar" class="button">
      <p>
        Egresar
      </p>
    </div>
    <div @click="ingresar" class="button">
      <p>
        INGRESAR
      </p>
    </div>
    <div @click="print" class="button">
      <p>
        Imprimir stock
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'products-buttons',
    props: {
      egresar: Function,
      ingresar: Function,
      print: Function
    }
  }
</script>

<style lang="scss" scoped>
.buttons {
  position: absolute;
  right: calc(7% - 60px);
  bottom: 20px;
  z-index: 9999;
  -webkit-user-select: none;
  .button {
    cursor: pointer;
    margin-bottom: 15px;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e5bf8d;
    border-radius: 100%;
    overflow: hidden;
    p {
      font-family: Lato;
      font-weight: 800;
      font-size: 20px;
      color: white;
      text-align: center;
      text-transform: uppercase;
    }
  }
}
</style>