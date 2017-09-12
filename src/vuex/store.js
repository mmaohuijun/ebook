import Vue from 'vue'
import Vuex from 'vuex'

import $storage from 'api/storage'

import user from './modules/user'
import cases from './modules/case'
import getters from './getters'
// import $axios from '../api/api' // 后台接口api

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    cases
  },
  // 定义状态
  state: {
    CASE_ID: '', // 案场id
    CASE_NAME: $storage.sessionStorage.getItem('CASE_NAME'), // 案场名称
    SIDEBAR_SELECT: '', // 侧边栏选中项
    CURRENT_PATH: '', // 当前路径名
    HAS_LOGIN: false, // 是否登录
    loading: false,
    ifShowErrorMsg: false,
    msgText: '',
    NODE_PATH: process.env.NODE_PATH
  },
  getters: {
    ...getters,
    getCaseId: state => state.CASE_ID,
    getLoginStatus: state => state.HAS_LOGIN
  },
  mutations: {
    initCaseId(state, id) {
      state.CASE_ID = id
    },
    initCaseName(state, name) {
      state.CASE_NAME = name
      $storage.sessionStorage.setItem('CASE_NAME', name)
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
  }
})

export default store
