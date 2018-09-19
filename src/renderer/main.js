import Vue from "vue";
import axios from "axios";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBoxOpen,
  faSignature,
  faCalendarCheck,
  faEllipsisH,
  faTrashAlt,
  faPen,
  faPlus,
  faChevronLeft,
  faTimes,
  faSave,
  faSearch,
  faPrint,
  faCog
} from "@fortawesome/free-solid-svg-icons";

import "material-design-icons/iconfont/material-icons.css";
import "typeface-roboto/index.css";
import "typeface-lato/index.css";
import "typeface-pacifico/index.css";

//Vue material
Vue.use(VueMaterial);

//Font awesome
library.add(
  faBoxOpen,
  faSignature,
  faCalendarCheck,
  faEllipsisH,
  faTrashAlt,
  faPen,
  faPlus,
  faChevronLeft,
  faTimes,
  faSave,
  faSearch,
  faPrint,
  faCog
);

Vue.component("fontawesome", FontAwesomeIcon);

import App from "./App";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
