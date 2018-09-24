<template>
  <div class="grid">
    <div class="sections">
      <template v-for="i in 3">
        <div :key="'sec-' + i" class="section">
          <div class="title">
            Cierre {{i}}
          </div>
          <div class="line"/>
        </div>
      </template>
      <div class="section active">
        <div class="title">
          Total
        </div>
        <div class="line"/>
      </div>
    </div>
    <div class="searchbar">
      <input placeholder="Buscar" type="text" />
    </div>
    <div class="btnTools">
      <button @click="setDate()" class="rect">
        Fecha
      </button>
      <button @click="print()" class="circle">
        <fontawesome icon="print" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "informes-toolbar",
  components: {},
  mounted() {},
  methods: {
    setDate() {},
    print() {}
  }
};
</script>

<style lang="scss" scoped>
.grid {
  grid-area: toolbar;
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 300px 2fr;
  grid-template-areas: "sections searchbar buttons";
  overflow: hidden;
  .sections {
    grid-area: sections;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
  .searchbar {
    grid-area: searchbar;
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
  .btnTools {
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
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
    }
    .rect {
      height: 40px;
      width: 100px;
    }
    .circle {
      $circleSize: 40px;
      height: $circleSize;
      width: $circleSize;
      border-radius: 50%;
      font-size: 18px;
    }
  }
}
</style>