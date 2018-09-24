import Vue from "vue";
import axios from "axios";
import App from "./App";
import router from "./router";
import store from "./store";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

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
  faCog,
  faWindowMinimize
} from "@fortawesome/free-solid-svg-icons";

import "typeface-lato/index.css";
import "typeface-pacifico/index.css";

Vue.use(Buefy);
Vue.use(ElementUI);

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
  faCog,
  faWindowMinimize
);

Vue.component("fontawesome", FontAwesomeIcon);

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
