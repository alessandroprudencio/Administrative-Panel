import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'

import './config/alertas'

import store from './config/store'

import router from './config/router'

Vue.config.productionTip = false

//conifgura axio para pegar token 
require('axios').defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6IkFsZXNzYW5kcm8gUHJ1ZGVuY2lvIiwiZW1haWwiOiJhbGVzc2FuZHJvQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDI1NDMzNTIsImV4cCI6MTU0MjU0Njk1Mn0.MA8-ryn11cVtN5mrlKn12vOhyrmaiI5ygv93muXliwo'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')