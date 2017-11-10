import Vue from 'vue'
import Router from 'vue-router'
import InfoBoard from '../components/InfoBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: InfoBoard
    }
  ]
})
