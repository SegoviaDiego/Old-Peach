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
          path: "/stats",
          component: require("@/components/Stats/index").default,
          children: [
            {
              path: "/informes",
              component: require("@/components/Stats/Informes/index").default
            },
            {
              path: "/sells",
              component: require("@/components/Stats/Sells/index").default
            },
            {
              path: "/movimientos",
              component: require("@/components/Stats/Movimientos/index").default
            },
            {
              path: "/ingresos",
              component: require("@/components/Stats/Ingresos/index").default
            },
            {
              path: "/egresos",
              component: require("@/components/Stats/Egresos/index").default
            }
          ]
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
