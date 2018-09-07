import { loadProducts } from "../backendish/Src/Product";
import { products as types } from "../vuexTypes";

export default {
  state: {
    data: [],
    inputs: {},
    loading: false,
    showSpinner: false
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
    async [types.inStock]({ commit, state }) {
      commit(types.startLoading);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      await inStock(state.inputs);
      commit(types.load, await LOAD_PRODUCTS());
      commit(types.stopLoading);
      commit(types.hideSpinner);
    },
    async [types.outStock]({ commit, state }, type) {
      commit(types.startLoading);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      await outStock(state.inputs, type);
      commit(types.load, await LOAD_PRODUCTS());
      commit(types.stopLoading);
      commit(types.hideSpinner);
    },
    [types.setInput]({ commit }, data) {
      commit(types.setInput, data);
    },
    [types.clearInputs]({ commit }, data) {
      commit(types.clearInputs);
    },
    [types.startRealTime]({ commit }) {
      startRealTimeProducts(async () => {
        commit(types.startLoading);
        setTimeout(() => {
          commit(types.showSpinner);
        }, 200);
        commit(types.load, await LOAD_PRODUCTS());
        commit(types.stopLoading);
        commit(types.hideSpinner);
      });
    },
    [types.stopRealTime]() {
      stopRealTimeProducts();
    }
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
    [types.setInput](state, { index, value } = data) {
      state.inputs[index] = value;
    },
    [types.clearInputs](state) {
      state.inputs = {};
    }
  }
};
