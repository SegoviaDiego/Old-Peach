<template>
  <div class="header">
    <div class="searchbar">
      <div class="container">
        <div class="input">
          <input type="text">
        </div>
        <div class="icon">
          <fontawesome icon="search" />
        </div>
      </div>
    </div>
    <div class="buttons">
      <template v-if="route === routes.default">
        <button @click="goTo(routes.inStock)" class="rounded">
          Ingreso
        </button>
        <button @click="goTo(routes.outStock)" class="rounded">
          Egreso
        </button>
        <button class="circle gray">
          <md-icon>print</md-icon>
        </button>
        <button @click="goTo(routes.more)" class="circle">
          <fontawesome icon="ellipsis-h" />
        </button>
      </template>
      <template v-else-if="route === routes.more">
        <button @click="goTo(routes.default)" class="circle">
          <fontawesome icon="chevron-left" />
        </button>
        <button @click="goTo(routes.createItem)" class="circle">
          <fontawesome icon="plus" />
        </button>
        <button @click="goTo(routes.editItems)" class="circle">
          <fontawesome icon="pen" />
        </button>
        <button @click="goTo(routes.deleteItems)" class="circle">
          <fontawesome icon="trash-alt" />
        </button>
      </template>
      <template v-else-if="route === routes.createItem">
        <button @click="goTo(routes.more, routes.createItem)" class="circle">
          <fontawesome icon="times" />
        </button>
        <button @click="validateItem()" class="circle">
          <fontawesome icon="save" />
        </button>
      </template>
      <template v-else-if="route === routes.deleteItems">
        <button @click="goTo(routes.more, routes.deleteItems)" class="circle">
          <fontawesome icon="times" />
        </button>
        <button @click="saveDeletes()" class="circle">
          <fontawesome icon="save" />
        </button>
      </template>
      <template v-else-if="route === routes.editItems">
        <button @click="goTo(routes.more, routes.editItems)" class="circle">
          <fontawesome icon="times" />
        </button>
        <button @click="saveChanges()" class="circle">
          <fontawesome icon="save" />
        </button>
      </template>
      <template v-else-if="route === routes.inStock">
        <button @click="goTo(routes.default, routes.inStock)" class="circle">
          <fontawesome icon="times" />
        </button>
        <button @click="saveInStock()" class="circle">
          <fontawesome icon="save" />
        </button>
      </template>
      <template v-else-if="route === routes.outStock">
        <button @click="goTo(routes.default, routes.outStock)" class="circle">
          <fontawesome icon="times" />
        </button>
        <button @click="saveOutStock()" class="circle">
          <fontawesome icon="save" />
        </button>
      </template> 
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import { products as types } from "../../store/vuexTypes";

export default {
  name: "products-header",
  props: {
    newItem: {},
    amount: {},
    selected: {},
    routes: {}
  },
  computed: mapState({
    isLoading: state => state.Products.loading,
    showSpinner: state => state.Products.showSpinner,
    route: state => state.Products.buttonRoute
  }),
  methods: {
    goTo(route, from) {
      this.$store.dispatch(types.buttons, route);
      if (from)
        switch (from) {
          case this.routes.createItem:
            break;
          case this.routes.editItems:
            break;
          case this.routes.deleteItems:
            this.selected = {};

            break;
          case this.routes.inStock:
          case this.routes.outStock:
            this.amount = {};
            break;
        }
    },
    saveInStock() {
      this.$store.dispatch(types.inStock, this.amount);
      this.goTo(this.routes.default, this.routes.inStock);
    },
    saveOutStock() {
      this.$store.dispatch(types.outStock, this.amount);
      this.goTo(this.routes.default, this.routes.outStock);
    },
    validateItem() {
      if (!this.newItem.name) {
        console.log(1);
        return;
      }
      if (!this.newItem.price) {
        console.log(2);
        return;
      }
      this.$store.dispatch(types.create, this.newItem);
    },
    saveChanges() {
      // this.amount = [];
    },
    saveDeletes() {}
  }
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
      background-color: #fdd835;
      height: 55px;
      width: 130px;
      border: none;
      padding: 15px 20px;
      text-decoration: none;
      text-transform: uppercase;
      border-radius: 40px;
      font-family: Lato;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .circle {
      &.gray {
        background-color: #e1e2e1;
      }
      background-color: #fdd835;
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