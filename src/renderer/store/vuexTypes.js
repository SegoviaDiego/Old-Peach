export const products = {
  // actions
  filter: "FILTER_CHANGE",
  buttons: "NAVIGATE_BUTTONS",
  create: "CREATE_PRODUCT",
  delete: "DELETE_PRODUCT",
  modify: "MODIFY_PRODUCT",
  inStock: "INCREASE_STOCK",
  outStock: "DECREASE_STOCK",
  load: "LOAD_PRODUCTS",
  syncToSystel: "SYNC_TO_SYSTEL",
  startRealTime: "START_LOADING_PRODUCTS_IN_REAL_TIME",
  stopRealTime: "STOP_LOADING_PRODUCTS_IN_REAL_TIME",
  ping: "PRODUCT_PING",
  // mutations
  startLoading: "START_LOADING",
  stopLoading: "STOP_LOADING",
  showSpinner: "SHOW_SPINNER",
  hideSpinner: "HIDE_SPINNER"
};

export const log = {
  totals: "LOG_TOTALS",
  inStock: "LOG_IN_STOCK",
  outStock: "LOG_OUT_STOCK"
};

export const totals = {
  load: "LOAD_TOTALS",
  filter: "FILTER_CHANGE",
  setDate: "SET_TOTALS_DATE",
  setCierreIndex: 'SET_CIERRE_INDEX',
  totalIndex: 'TOTAL_INDEX',
  // mutations
  startLoading: "START_LOADING",
  stopLoading: "STOP_LOADING",
  showSpinner: "SHOW_SPINNER",
  hideSpinner: "HIDE_SPINNER"
};

export const sells = {
  load: "LOAD_SELLS",
  filter: "FILTER_CHANGE",
  setDate: "SET_SELLS_DATE",
  // mutations
  startLoading: "START_LOADING",
  stopLoading: "STOP_LOADING",
  showSpinner: "SHOW_SPINNER",
  hideSpinner: "HIDE_SPINNER"
};
