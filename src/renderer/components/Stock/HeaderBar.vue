<template>
  <div class="header">
    <div class="searchbar">
      <div class="container">
        <div class="input">
          <input
              :value="filter"
              @input="filterChanged($event.target.value)"
              placeholder="Buscar producto" type="text">
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
          <md-tooltip md-direction="top">
            Ingreso
          </md-tooltip>
        </button>
        <button @click="goTo(routes.outStock)" class="rounded">
          Egreso
          <md-tooltip md-direction="top">
            Egreso
          </md-tooltip>
        </button>
        <button @click="print()" class="circle gray">
          <fontawesome icon="print" />
          <md-tooltip md-direction="top">
            Imprimir
          </md-tooltip>
        </button>
        <!-- <button @click="goTo(routes.more)" class="circle">
          <fontawesome icon="ellipsis-h" />
        </button> -->
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
          <md-tooltip md-direction="top">
            Cancelar
          </md-tooltip>
        </button>
        <button @click="saveInStock()" class="circle">
          <fontawesome icon="save" />
          <md-tooltip md-direction="top">
            Guardar cambios
          </md-tooltip>
        </button>
      </template>
      <template v-else-if="route === routes.outStock">
        <button @click="goTo(routes.default, routes.outStock)" class="circle">
          <fontawesome icon="times" />
          <md-tooltip md-direction="top">
            Cancelar
          </md-tooltip>
        </button>
        <button @click="saveOutStock()" class="circle">
          <fontawesome icon="save" />
          <md-tooltip md-direction="top">
            Guardar cambios
          </md-tooltip>
        </button>
        <div class="select">
          <md-field :class="selectValidClass">
            <md-select v-model="type" placeholder="Tipo de Egreso">
              <md-option value="1">Transferencia</md-option>
              <md-option value="2">Reciclado</md-option>
              <md-option value="3">Baja</md-option>
            </md-select>
            <span class="md-error">Debes seleccionar un tipo de egreso</span>
          </md-field>
        </div>
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
    changes: {},
    routes: {}
  },
  computed: mapState({
    isLoading: state => state.Products.loading,
    showSpinner: state => state.Products.showSpinner,
    route: state => state.Products.buttonRoute,
    filter: state => state.Products.filter
  }),
  data: () => ({
    type: null,
    selectValidClass: ""
  }),
  methods: {
    filterChanged(value) {
      this.$store.dispatch(types.filter, value);
    },
    print() {
      this.$emit("print");
    },
    goTo(route, from) {
      this.type = null;
      this.selectValidClass = "";
      this.$emit("go-to", route, from);
    },
    saveInStock() {
      this.$store.dispatch(types.inStock, this.amount);
      this.goTo(this.routes.default, this.routes.inStock);
    },
    saveOutStock() {
      if (!this.type) {
        this.selectValidClass = "md-invalid";
      } else {
        this.selectValidClass = "";
        this.$store.dispatch(types.outStock, {
          amount: this.amount,
          type: this.type
        });
        this.goTo(this.routes.default, this.routes.outStock);
      }
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
      this.goTo(this.routes.default, this.routes.createItem);
    },
    saveChanges() {
      // this.amount = [];
    },
    saveDeletes() {
      this.$store.dispatch(types.delete, this.selected);
      this.goTo(this.routes.default, this.routes.deleteItems);
    }
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
  padding: 0 2%;
  .searchbar {
    height: 55px;
    $radius: 30px;
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
      height: 100%;
      input {
        padding: 0px 10px;
        font-size: 20px;
        font-weight: bold;
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
      display: flex;
      margin-right: 15px;
      justify-content: flex-end;
      align-items: center;
      flex: 2;
      font-size: 34px;
      color: #3d3d3d;
    }
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    button {
      margin-left: 5px;
      transition: 300ms;
      &:hover {
        color: #ff5722;
      }
    }
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
    .select {
      margin-left: 10px;
    }
  }
}
</style>