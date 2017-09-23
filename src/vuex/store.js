import Vue from 'vue'
import Vuex from 'vuex'

/** 模块 */
import user from './modules/user'
import cases from './modules/case'
import app from './modules/app'
import auth from './modules/auth'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    cases,
    app,
    auth
  },
  getters
})

export default store
