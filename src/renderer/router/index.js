import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: require("@/components/Main/index").default,
      children: [
        {
          path: "/updater",
          component: require("@/components/Updater/index").default
        },
        {
          path: "/dashboard",
          component: require("@/components/Dashboard/index").default
        },
        {
          path: "/stock",
          component: require("@/components/Stock/index").default
        },
        {
          path: "/charts",
          component: require("@/components/Chart/index").default
        },
        {
          path: "/settings",
          component: require("@/components/Settings/index").default
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
