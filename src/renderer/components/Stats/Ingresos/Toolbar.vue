<template>
  <div class="toolbarFlex">
    <div class="date">
      {{getDate()}}
    </div>
    <div class="searchbar">
      <input
        :value="filter"
        @input="filterChanged($event.target.value)"
        placeholder="Buscar" type="text">
    </div>
    <b-tooltip label="Text is dashed">
      <button @click="showDateSelection = true" class="rect">
          Fecha
      </button>
    </b-tooltip>
    <button @click="print()" class="circle">
      <fontawesome icon="print" />
    </button>
    
    <!-- Dialog -->
    <!-- <md-dialog class="dateDialog" :md-active.sync="showDateSelection">
      <md-dialog-title>Seleecionar fecha</md-dialog-title>

      <md-dialog-content class="container">
         <v-date-picker
          mode='single'
          v-model='selectedDate'
          :input-props='{ class: "datePicker", placeholder: "Ingresar la fecha", readonly: true }'>
          >
        </v-date-picker>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDateSelection = false">Cancelar</md-button>
        <md-button class="md-primary" @click="setDate()">Aceptar</md-button>
      </md-dialog-actions>
    </md-dialog> -->

  </div>
</template>

<script>
import { mapState } from "Vuex";
import { sells as types } from "../../../store/vuexTypes";

export default {
  name: "informes-toolbar",
  components: {},
  mounted() {},
  computed: mapState({
    isLoading: state => state.Sells.loading,
    showSpinner: state => state.Sells.showSpinner,
    filter: state => state.Sells.filter,
    date: state => state.Sells.date
  }),
  data: () => ({
    showDateSelection: true,
    selectedDate: null
  }),
  methods: {
    filterChanged(value) {
      this.$store.dispatch(types.filter, value);
    },
    getDate() {
      let now = new Date();
      if (
        now.getDate() == this.date.getDate() &&
        now.getMonth() == this.date.getMonth() &&
        now.getFullYear() == this.date.getFullYear()
      ) {
        return "Ultimas operaciones";
      }

      return `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
    },
    setDate() {},
    print() {}
  }
};
</script>

<style lang="scss" scoped>
.datePicker {
  background: red !important;
}
.dateDialog {
  overflow: visible;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }
}
.toolbarFlex {
  grid-area: toolbar;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border-bottom: 2px solid #959595;
  .date {
    padding-left: 10px;
    grid-area: date;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-family: Lato;
    font-weight: bold;
    font-size: 26px;
    color: #000;
  }
  .searchbar {
    margin: 0px 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    input {
      border: none;
      outline: none;
      background-color: #e1e2e1;
      color: #000;
      font-family: Lato;
      // font-weight: 300;
      font-size: 20px;
      border-radius: 20px;
      padding: 5px 20px;
      width: 250px;
    }
  }
  button {
    margin-right: 10px;
    background-color: #fdd835;
    border: none;
    text-decoration: none;
    text-transform: capitalize;
    font-family: Lato;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: 300ms;
    &:hover {
      color: #ff5722;
    }
    &.rect {
      height: 40px;
      width: 100px;
    }
    &.circle {
      $circleSize: 40px;
      height: $circleSize;
      width: $circleSize;
      border-radius: 50%;
      font-size: 18px;
    }
  }
}
</style>