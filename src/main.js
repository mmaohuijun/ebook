import Vue from 'vue'
import App from './App'
import { router } from './router'
import Vuex from 'vuex'
import store from './vuex/store'

import _ from 'lodash'
import $ from 'jquery'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import $axios from './api/api' // 后台接口api

Vue.use(iView, Vuex, $, _)
Object.defineProperty(Vue.prototype, '$axios', { value: $axios })
Object.defineProperty(Vue.prototype, '$_', { value: _ })
Object.defineProperty(Vue.prototype, '$', { value: $ })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
