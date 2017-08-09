import Vue from 'vue'
import Vuex from 'vuex'

// import $axios from '../api/api' // 后台接口api

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    LOGIN_NAME: '',
    NAME: '',
    MOBILE: '',
    NUMBER: '',
    CASE_ID: '', // 案场id
    loading: false,
    ifLogin: true, // 账号是否登录
    ifShowErrorMsg: false,
    msgText: '666'
  },
  getters: {
    getLoginStatus: state => state.ifLogin,
    getCaseId: state => state.CASE_ID
  },
  mutations: {
    initInfo(state, json) {
      state.NAME = json.name
      state.LOGIN_NAME = json.loginName
      state.MOBILE = json.mobile
      state.NUMBER = json.no
    },
    initCaseId(state, id) {
      state.CASE_ID = id
    },
    showLoading(state) {
      state.loading = true
    },
    hideLoading(state) {
      state.loading = false
    },
    showErrorMsg(state, text) {
      state.ifShowErrorMsg = true
      state.msgText = text
      setTimeout(() => {
        state.ifShowErrorMsg = false
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
