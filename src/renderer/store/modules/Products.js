import { loadProducts, createProduct, inStock, outStock } from "../backendish/Src/Product";
import { products as types } from "../vuexTypes";

export default {
  state: {
    data: [],
    inputs: {},
    loading: false,
    showSpinner: false,
    buttonRoute: 1,
  },
  actions: {
    async [types.load]({ commit }) {
      commit(types.startLoading);
      commit(types.load, []);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      commit(types.load, await loadProducts());
      commit(types.stopLoading);
      commit(types.hideSpinner);
    },
    async [types.create]({ commit }, product) {
      commit(types.startLoading);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      await createProduct(product);
      commit(types.load, await loadProducts());
      commit(types.stopLoading);
      commit(types.hideSpinner);
    },
    async [types.inStock]({ commit }, amount) {
      commit(types.startLoading);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      await inStock(amount);
      commit(types.load, await loadProducts());
      commit(types.stopLoading);
      commit(types.hideSpinner);
    },
    async [types.outStock]({ commit }, amount) {
      commit(types.startLoading);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      await outStock(amount);
      commit(types.load, await loadProducts());
      commit(types.stopLoading);
      commit(types.hideSpinner);
    },
    [types.startRealTime]({ commit }) {
      startRealTimeProducts(async () => {
        commit(types.startLoading);
        setTimeout(() => {
          commit(types.showSpinner);
        }, 200);
        commit(types.load, await loadProducts());
        commit(types.stopLoading);
        commit(types.hideSpinner);
      });
    },
    [types.stopRealTime]() {
      stopRealTimeProducts();
    },
    [types.buttons]({ commit }, route) {
      commit(types.buttons, route);
    },
  },
  mutations: {
    [types.load](state, payload) {
      state.data = payload;
    },
    [types.startLoading](state) {
      state.loading = true;
    },
    [types.stopLoading](state) {
      state.loading = false;
    },
    [types.showSpinner](state) {
      if (state.loading) {
        state.showSpinner = true;
      }
    },
    [types.hideSpinner](state) {
      state.showSpinner = false;
    },
    [types.buttons](state, route) {
      state.buttonRoute = route;
    }
  }
};
