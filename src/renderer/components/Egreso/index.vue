<template>
  <div class="wrapper">
    <Table
      :data="data"
      :titles="titles"
      :isLoading="isLoading"
      :showSpinner="showSpinner"
      :setInput="setInput"
      editable />
      <div class="testBtn">
        <div class="selection md-card">
          <md-field>
            <md-select
              v-model="type"
              placeholder="Tipo de egreso">
              <md-option value="1">
                Transferencia
              </md-option>
              <md-option value="2">
                Reciclado
              </md-option>
              <md-option value="3">
                Vencimiento
              </md-option>
            </md-select>
          </md-field>
        </div>
        <div>
          <md-button
            class="md-raised md-accent"
            @click="egresar"
            :disabled="type == null">
              Egresar
          </md-button>
        </div>
      </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import {products as types} from '../../store/vuexTypes';
  import Table from '../OxyTable/index.vue';

  function validateData(data) {

  }

  export default {
    name: 'in-page',
    components: {
      Table,
    },
    created () {
      this.$store.dispatch(types.clearInputs);
      this.$store.dispatch(types.load);
      // this.$store.dispatch(types.startRealTime);
      // setTimeout( () => {
      //   this.showSpinner = true;
      // }, 300);
    },
    beforeDestroy () {
      // this.$store.dispatch(types.stopRealTime);
    },
    methods: {
      egresar () {
        // this.$store.dispatch(types.outStock, this.type);
        this.$store.dispatch(types.clearInputs);
        this.type = null;
      },
      setInput (index, value) {
        this.$store
          .dispatch(types.setInput,{index,value,});
      }
    },
    data: () => ({
      type: null,
      titles: [
          {
            id: 1,
            label: 'Id',
            flex: 1
          },
          {
            id: 2,
            label: 'Nombre',
            flex: 3
          },
          {
            id: 3,
            label: 'En stock',
            flex: 3
          },
          {
            id: 4,
            label: 'Cantidad',
            flex: 3
          },
        ]
    }),
    computed: mapState({
      data: state => state.Products.data,
      inputs: state => state.Products.inputs,
      isLoading: state => state.Products.loading,
      showSpinner: state => state.Products.showSpinner
    }),
  }
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  background-color: #d8dfe2;
  padding: 20px 7%;
  height: 100%;
  width: 100%;
}
.testBtn {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  .selection {
    background-color: white;
  }
}
</style>