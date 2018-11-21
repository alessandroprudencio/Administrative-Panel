import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'

import './config/alertas'

import store from './config/store'

import router from './config/router'

import   './config/sessaoExpirada'

import './config/mq'

import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)

Vue.config.productionTip = false

//conifgura axio para pegar token 

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')