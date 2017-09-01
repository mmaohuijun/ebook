import Vue from 'vue'
import Vuex from 'vuex'

import $storage from 'api/storage'
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
    CASE_NAME: '', // 案场名称
    SIDEBAR_SELECT: '', // 侧边栏选中项
    CURRENT_PATH: '', // 当前路径名
    HAS_LOGIN: false, // 是否登录
    loading: false,
    ifShowErrorMsg: false,
    msgText: ''
  },
  getters: {
    getCaseId: state => state.CASE_ID,
    getLoginName: state => {
      const loginName = $storage.localStorage.getItem('USER_LOGIN_NAME')
      return loginName
    },
    getLoginStatus: state => state.HAS_LOGIN,
    hasUserInfo: state => {
      const userInfo = $storage.sessionStorage.getItem('USER_INFO')
      return userInfo !== undefined
    }
  },
  mutations: {
    initCaseId(state, id) {
      state.CASE_ID = id
    },
    initCaseName(state, name) {
      state.CASE_NAME = name
    },
    initSideBar(state, str) {
      state.SIDEBAR_SELECT = str
    },
    initPathName(state, str) {
      state.CURRENT_PATH = str
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
      state.HAS_LOGIN = true
    },
    notLogin(state) {
      state.HAS_LOGIN = false
    }
  },
  actions: {
    initUserInfo({ state }, json) {
      state.NAME = json.name
      state.LOGIN_NAME = json.loginName
      state.MOBILE = json.mobile
      state.NUMBER = json.no
      $storage.sessionStorage.setItem('USER_INFO', json)
    },
    getUserInfo({ state }) {
      const info = $storage.sessionStorage.getItem('USER_INFO')
      if (!info) return
      state.NAME = info.name
      state.LOGIN_NAME = info.loginName
      state.MOBILE = info.mobile
      state.NUMBER = info.no
    },
    clearUserInfo() {
      $storage.sessionStorage.removeItem('USER_INFO')
    },
    remeberLoginName({ state }, name) {
      $storage.localStorage.setItem('USER_LOGIN_NAME', name)
    },
    clearLoginName() {
      $storage.localStorage.removeItem('USER_LOGIN_NAME')
    }
  }
})

export default store
