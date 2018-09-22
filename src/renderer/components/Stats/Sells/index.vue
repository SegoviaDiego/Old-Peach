<template>
  <div class="grid">
    <div class="searchbar">
      <md-field>
        <label>Buscar ventas</label>
        <md-input/>
      </md-field>
    </div>
    <div class="sells">
      <template v-for="sell in sells">
        <md-card :key="sell._id" class="sell" md-with-hover>
          <md-card-header>
            <div class="md-title">
              {{getDate(sell.date)}}
            </div>
          </md-card-header>

          <md-card-content>
            $ {{sell.amount}}
          </md-card-content>
        </md-card>
      </template>
      <template>
        <div class="spinner">
          <!-- <md-progress-spinner md-mode="indeterminate"/> -->
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { sells as types } from "../../../store/vuexTypes";
export default {
  name: "sells",
  computed: mapState({
    isLoading: state => state.Sells.loading,
    showSpinner: state => state.Sells.showSpinner,
    sells: state => state.Sells.data
  }),
  data: () => ({
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ]
  }),
  mounted() {
    this.infiniteScroll();
    this.$store.dispatch(types.load);
  },
  methods: {
    getDate(d) {
      return `${
        this.days[d.getDay()]
      } ${d.getDate()} de ${d.getMonth()} de ${d.getFullYear()}`;
    },
    infiniteScroll() {
      // window.onscroll = () => {
      //   let bottomOfWindow =
      //     document.documentElement.scrollTop + window.innerHeight ===
      //     document.documentElement.offsetHeight;
      //   if (bottomOfWindow) {
      //     console.log('ALto faso ameo');
      //   }
      // };
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
  grid-template-areas: "searchbar" "sells";
  .searchbar {
    grid-area: searchbar;
    .md-field {
      margin: 0px;
    }
  }
  .sells {
    grid-area: sells;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &::-webkit-scrollbar {
      $scrollbarSize: 10px;
      width: $scrollbarSize;
    }
    &::-webkit-scrollbar-track {
      background-color: #e1e2e1;
    }
    &::-webkit-scrollbar-thumb {
      $borderSize: 7px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 7px;
    }
    .sell {
      width: 60%;
      margin-top: 20px;
    }
  }
}
</style>