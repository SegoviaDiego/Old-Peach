<template>
  <div class="grid">
    <template v-if="cierreIndex">
      asd
      <div class="info">
        <div class="date">
          {{getDate()}}
        </div>
        <div class="total">
          <template v-if="cierreIndex && current">
            <template v-if="cierreIndex == totalIndex">
              Total: $ {{current.total}}
            </template>
            <template v-else>
              Total en Cierre {{cierreIndex}}: $ {{current.cierres[cierreIndex - 1].total}}
            </template>
          </template>
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
    </template>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { equalDates } from "../../../store/backendish/Src/Utils";
import { totals as types } from "../../../store/vuexTypes";

export default {
  name: "informes-sidebar",
  data: () => ({
    totalIndex: types.totalIndex
  }),
  computed: mapState({
    date: state => state.Totals.date,
    isLoading: state => state.Totals.loading,
    current: state => state.Totals.data,
    cierreIndex: state => state.Totals.cierreIndex
  }),
  methods: {
    getDate() {
      // if (equalDates(new Date(), this.current.date))
      //   return "Hoy";
      return `
      ${this.current.date.getDate()}/
      ${this.current.date.getMonth()}/
      ${this.current.date.getFullYear()}`;
    }
  }
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