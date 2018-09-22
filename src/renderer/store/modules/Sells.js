import { loadSells } from "../backendish/Src/Sell";
import { sells as types } from "../vuexTypes";

export default {
  state: {
    data: [],
    loading: false,
    showSpinner: false,
    filter: "",
    from: 0,
    to: 10
  },
  actions: {
    async [types.load]({ commit, state }) {
      commit(types.startLoading);
      setTimeout(() => {
        commit(types.showSpinner);
      }, 200);
      commit(types.load, await loadSells(state.from, state.to));
      commit(types.stopLoading);
      commit(types.hideSpinner);
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
    [types.filter](state, value) {
      state.filter = value;
    }
  }
};
