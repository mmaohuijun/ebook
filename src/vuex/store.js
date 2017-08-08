import Vue from 'vue'
import Vuex from 'vuex'

// import $axios from '../api/api' // 后台接口api

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    loading: false,
    ifLogin: true, // 账号是否登录
    ifShowMsg: false,
    msgText: '666'
  },
  getters: {
    getLoginStatus: state => state.ifLogin
  },
  mutations: {
    showLoading(state) {
      state.loading = true
    },
    hideLoading(state) {
      state.loading = false
    },
    showMsg(state, text) {
      state.ifShowMsg = true
      state.msgText = text
      setTimeout(() => {
        state.ifShowMsg = false
      }, 3000)
    },
    hasLogin(state) {
      state.ifLogin = true
    },
    notLogin(state) {
      state.ifLogin = false
    }
  },
  actions: {
  }
})

export default store
