// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueMaterial from 'vue-material'
import '../vue-material-master/dist/vue-material.css'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'light-green',
      hue: 700
    },
    accent: 'red',
    warn: 'red',
    background: 'white'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { 
    App
   }
})
