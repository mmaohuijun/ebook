import Vue from 'vue'
import Vuex from 'vuex'

/** 模块 */
import user from './modules/user'
import cases from './modules/case'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    cases,
    app
  },
  getters
})

export default store
