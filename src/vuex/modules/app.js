const app = {
  state: {
    sideBarSelect: '',
    currentPathName: '',
    hasLogin: false,
    isLoading: false,
    ifShowErrorMsg: false,
    errorMsgText: ''
  },
  mutations: {
    SET_SIDEBAR_SELECT(state, str) {
      state.sideBarSelect = str
    },
    SET_CURRENT_PATH(state, path) {
      state.currentPathName = path
    },
    TOGGLE_LOGIN_STATUS(state, flag) {
      state.hasLogin = flag
    },
    TOGGLE_LOADING_STATUS(state, flag) {
      state.isLoading = flag
    },
    SHOW_ERROR_MSG(state, text) {
      state.ifShowErrorMsg = true
      state.errorMsgText = text
      setTimeout(() => {
        state.ifShowErrorMsg = false
      }, 3000)
    }
  },
  actions: {
    setSideBarSelect({ commit }, str) {
      commit('SET_SIDEBAR_SELECT', str)
    },
    setCurrentPathName({ commit }, pathName) {
      commit('SET_CURRENT_PATH', pathName)
    },
    toggleLoginStatus({ commit }, flag) {
      commit('TOGGLE_LOGIN_STATUS', flag)
    },
    toggleLoadingStatus({ commit }, flag) {
      commit('TOGGLE_LOADING_STATUS', flag)
    },
    showErrorMsg({ commit }, text) {
      commit('SHOW_ERROR_MSG', text)
    }
  }
}

export default app
