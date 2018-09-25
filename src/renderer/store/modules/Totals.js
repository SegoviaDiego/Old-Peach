import { load } from "../backendish/Src/Total";
import { totals as types } from "../vuexTypes";

export default {
  state: {
    data: undefined,
    loading: false,
    filter: null,
    date: new Date(),
    cierreIndex: null
  },
  actions: {
    async [types.load]({ commit, state }) {
      commit(types.startLoading);
      commit(types.load, await load(state.date));
      commit(types.stopLoading);
    },
    [types.setDate]({ commit }, newDate) {
      commit(types.setDate, newDate);
    },
    [types.setCierreIndex]({ commit }, index) {
      commit(types.setCierreIndex, index);
    }
  },
  mutations: {
    [types.load](state, payload) {
      state.data = payload;
      if (state.data.cierres.length > state.cierreIndex)
        state.cierreIndex = null;
    },
    [types.startLoading](state) {
      state.loading = true;
    },
    [types.stopLoading](state) {
      state.loading = false;
    },
    [types.filter](state, value) {
      state.filter = value;
    },
    [types.setDate](state, value) {
      state.date = value;
    },
    [types.setCierreIndex](state, value) {
      state.cierreIndex = value;
    }
  }
};
