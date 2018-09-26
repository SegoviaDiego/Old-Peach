<template>
  <div class="grid">
    <template v-if="cierreIndex">
      <div class="info">
        <div class="date">
          {{getDate()}}
        </div>
        <div class="total">
          <template v-if="cierreIndex && current">
            <template v-if="cierreIndex == totalIndex">
              Total: $ {{current.total}}
            </template>
            <template v-else-if="cierreIndex == cierres">
              Total en Turno Atual: $ {{current.cierres[cierreIndex - 1].total}}
            </template>
            <template v-else>
              Total en Cierre {{cierreIndex}}: $ {{current.cierres[cierreIndex - 1].total}}
            </template>
          </template>
        </div>
        <div class="comparison">
          <!-- $2393 <span style="color: green;">más</span> que ayer. -->
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
    cierreIndex: state => state.Totals.cierreIndex,
    cierres(state) {
      if (state.Totals.data) {
        return state.Totals.data.cierres.length;
      }
      return 0;
    }
  }),
  methods: {
    getDate() {
      let date = "";
      let time = "";

      if (equalDates(new Date(), this.current.date)) {
        date = "Hoy";
      } else {
        date = `
          ${this.current.date.getDate()}/
          ${this.current.date.getMonth()}/
          ${this.current.date.getFullYear()}`;
      }

      if (this.cierreIndex == this.totalIndex) {
        return date;
      } else {
        if (this.cierreIndex == this.cierres) {
          time = `Turno actual`;
          return time;
        } else {
          time = `
          ${this.current.cierres[this.cierreIndex - 1].date.getHours()}:
          ${this.current.cierres[this.cierreIndex - 1].date.getMinutes()}`;
        }
        return date + " a las " + time;
      }
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