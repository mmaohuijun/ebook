const app = {
  state: {
    sideBarSelect: '',
    currentPath: '',
    hasLogin: false
  },
  mutations: {
    SET_SIDEBAR_SELECT(state, str) {
      state.sideBarSelect = str
    },
    SET_CURRENT_PATH(state, path) {
      state.currentPath = path
    },
    TOGGLE_LOGIN_STATUS(state, flag) {
      state.hasLogin = flag
    }
  },
  actions: {
    setSideBarSelect({ commit }, str) {
      console.log('setSideBarSelect', str)
      commit('SET_SIDEBAR_SELECT', str)
    },
    setCurrentPath({ commit }, path) {
      console.log('setCurrentPath', path)
      commit('SET_CURRENT_PATH', path)
    },
    toggleLoginStatus({ commit }, flag) {
      console.log('toggleLoginStatus', flag)
      commit('TOGGLE_LOGIN_STATUS', flag)
    }
  }
}

export default app
