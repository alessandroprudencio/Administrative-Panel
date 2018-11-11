import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'

import './config/alertas'

import store from './config/store'

import router from './config/router'

Vue.config.productionTip = false

//conifgura axio para pegar token 
require('axios').defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6InRlc3RlIiwiZW1haWwiOiJhbGVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTk3NjA3MiwiZXhwIjoxNTQxOTc5NjcyfQ.V326hUC6W-v__AKuKTpEIs_osnJUOJRnstEiIk1U6AI'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')