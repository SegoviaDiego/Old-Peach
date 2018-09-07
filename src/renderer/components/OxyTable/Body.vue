<template>
  <md-content class="Body md-scrollbar"
    :style="`${
      (isLoading && showSpinner) ?
      'overflow:hidden !important;' : '' }`">
    <div
      v-if="isLoading && showSpinner"
      class="loadingFlex">
      <div class="loadingSpinner">
        <md-progress-spinner
        md-mode="indeterminate"/>
      </div>
      <div class="loadingText">
        Cargando
      </div>
    </div>
    <Row
      v-for="item in data"
      :item="item" :editable="editable"
      :setInput="setInput"
      :key="item.id + '-productRow'" />
  </md-content>
</template>

<script>
  import Row from './Row.vue';

  export default {
    name: 'products-table',
    components: {
      Row
    },
    props: {
      data: null,
      editable: Boolean,
      inputArray: {},
      isLoading: Boolean,
      showSpinner: Boolean,
      setInput: Function
    },
  }
</script>

<style lang="scss" scoped>
@import '~lato-font/css/lato-font.css';
.Body {
  flex: 9;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: Lato;
  font-weight: 500;
  font-size: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  .loadingFlex {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    .loadingText {
      margin-top: 20px;
    }
  }
}
</style>