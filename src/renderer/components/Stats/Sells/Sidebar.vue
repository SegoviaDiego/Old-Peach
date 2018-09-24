<template>
  <div class="grid">
    <div class="info">
      <div class="date">
        20/09/2018
      </div>
      <div class="total">
        Total vendido: $91238
      </div>
      <div class="comparison">
        $2393 <span style="color: green;">más</span> que ayer.
      </div>
    </div>
    <div class="buttons">
      <div class="circle">
        <div class="icon">
          <fontawesome icon="search" />
        </div>
        <div class="title">
          Detalle
        </div>
      </div>
      <div class="circle">
        <div class="icon">
          <fontawesome icon="search" />
        </div>
        <div class="title">
          Grafico
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "informes-sidebar",
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.grid {
  grid-area: sidebar;
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr;
  grid-template-areas: "info" "buttons";
  overflow: hidden;
  .info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    * {
      display: none;
      color: #000;
      font-size: 24px;
      font-weight: bold;
      font-family: Lato;
      margin-bottom: 10px;
    }
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    .circle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      $circleSize: 10vw;
      width: $circleSize;
      height: $circleSize;
      border-radius: 50%;
      background-color: #ff7043;
      color: #fff;
      font-size: 24px;
      // font-weight: bold;
      font-family: Lato;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
</style>