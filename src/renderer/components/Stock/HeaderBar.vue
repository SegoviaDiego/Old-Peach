<template>
  <div class="header">
    <div class="searchbar">
      <div class="container">
        <div class="input">
          <input type="text">
        </div>
        <div class="icon">asd</div>
      </div>
    </div>
    <div class="buttons">
      <button class="rounded">
        Ingreso
      </button>
      <button class="rounded">
        Egreso
      </button>
      <button class="circle">
        <md-icon>print</md-icon>
      </button>
      <button class="circle">
        <fontawesome icon="ellipsis-h" />
      </button>
      <button class="circle">
        <fontawesome icon="trash-alt" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "products-header"
};
</script>

<style lang="scss" scoped>
.header {
  grid-area: header;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "searchbar buttons";
  .searchbar {
    $radius: 60px;
    grid-area: searchbar;
    display: flex;
    background-color: #fdd835;
    border-bottom-left-radius: $radius;
    border-top-right-radius: $radius;
    padding: 0px $radius;
    overflow: hidden;
    .container {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #e1e2e1;
    }
    .input {
      flex: 8;
      input {
        width: 100%;
        height: 100%;
        border-color: none;
        outline: none;
        background-color: transparent;
        border: none;
        border-radius: none;
        box-shadow: none;
      }
    }
    .icon {
      flex: 2;
    }
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .rounded {
      height: 55px;
      width: 130px;
      border: none;
      padding: 15px 20px;
      text-decoration: none;
      background-color: #fdd835;
      text-transform: uppercase;
      border-radius: 40px;
      font-family: Lato;
      font-size: 20px;
      cursor: pointer;
    }
    .circle {
      height: 55px;
      width: 55px;
      border: none;
      text-decoration: none;
      text-transform: uppercase;
      border-radius: 50%;
      cursor: pointer;
      font-size: 24px;
    }
  }
}
</style>