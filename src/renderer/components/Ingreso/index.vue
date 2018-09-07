<template>
  <div class="wrapper">
    <Table
      :data="data"
      :isLoading="isLoading"
      :showSpinner="showSpinner"
      :setInput="setInput"
      editable />
      <div class="testBtn">
        <md-button
          class="md-raised md-primary"
          @click="ingresar" >
            Ingresar
        </md-button>
      </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import {products as types} from '../../store/vuexTypes';
  import Table from './Table.vue';

  function validateData(data) {

  }

  export default {
    name: 'in-page',
    components: {
      Table,
    },
    created () {
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
      ingresar () {
        this.$store.dispatch(types.inStock);
      },
      setInput (index, value) {
        this.$store
          .dispatch(types.setInput, {index, value});
      },
    },
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
}
</style>