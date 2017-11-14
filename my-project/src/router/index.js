import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout'
import InfoBoard from '../components/InfoBoard'
import Login from '../components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      components: {
        default: Layout,
        content: InfoBoard
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
