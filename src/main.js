import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'
import $ from 'jquery'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import $axios from './api/api' // 后台接口api

Vue.use(iView, $, _)
Object.defineProperty(Vue.prototype, '$axios', { value: $axios })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
