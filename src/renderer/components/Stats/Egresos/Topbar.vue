<template>
  <div class="grid">
    <div class="section active">
      <div class="title">
        Vencimiento
      </div>
      <div class="line"/>
    </div>
    <div class="section">
      <div class="title">
        Reciclado
      </div>
      <div class="line"/>
    </div>
    <div class="section">
      <div class="title">
        Transferencia
      </div>
      <div class="line"/>
    </div>
    <div class="section">
      <div class="title">
        Todo
      </div>
      <div class="line"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "egresos-topbar",
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.grid {
  grid-area: topbar;
  position: relative;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .section {
    flex: 1;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    * {
      transition: 200ms;
    }
    &:hover .line,
    &.active .line {
      margin-top: 7px;
      background-color: #000;
      width: 60%;
      height: 5px;
    }
    .title {
      margin: 0;
      text-transform: capitalize;
      font-family: Lato;
      font-weight: bold;
      font-size: 25px;
      color: #000;
    }
    .line {
      margin-top: 5px;
      background-color: #a0a0a0;
      width: 30%;
      height: 3px;
    }
  }
}
</style>