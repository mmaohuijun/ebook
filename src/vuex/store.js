import Vue from 'vue'
import Vuex from 'vuex'

// import $storage from 'api/storage'

import user from './modules/user'
import cases from './modules/case'
import app from './modules/app'
import getters from './getters'
// import $axios from '../api/api' // 后台接口api

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    cases,
    app
  },
  // 定义状态
  state: {
    // ifShowErrorMsg: false,
    // msgText: '',
    NODE_PATH: process.env.NODE_PATH
  },
  getters
  // mutations: {
  //   showErrorMsg(state, text) {
  //     state.ifShowErrorMsg = true
  //     state.msgText = text
  //     setTimeout(() => {
  //       state.ifShowErrorMsg = false
  //     }, 3000)
  //   }
  // }
})

export default store
