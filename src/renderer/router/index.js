import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Main/index').default,
      children: [
        {
          path: '/stock',
          component: require('@/components/Stock/index').default
        },
        {
          path: '/egreso',
          component: require('@/components/Egreso/index').default
        },
        {
          path: '/ingreso',
          component: require('@/components/Ingreso/index').default
        },
        {
          path: '/informes',
          component: require('@/components/Report/index').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
