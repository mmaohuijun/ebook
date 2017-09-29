import $storage from 'api/storage'

const user = {
  state: {
    loginName: '', // 登录账号
    name: '', // 姓名
    mobile: '', // 手机
    no: '', // 工号
    type: '', // case-worker 表示外部用户; sys-user 表示为 内部用户
    // auth: ['CaseManage', 'Organization', 'IntUser', 'ExtUser', 'Authority', 'CallClient', 'VisitClient', 'DealClient', 'UnassignedClient', 'AddClient'] // 权限
    auth: [], // 权限
    adminFlag: false
  },
  mutations: {
    SET_USERINFO(state, json) {
      state.loginName = json.loginName
      state.name = json.name
      state.mobile = json.mobile
      state.no = json.no
      state.auth = json.auth
      state.type = json.type
      state.adminFlag = json.adminFlag
    },
    SET_LOGIN_NAME(state, name) {
      state.loginName = name
    }
  },
  actions: {
    setUserInfo({ commit, dispatch }, json) {
      dispatch('clearUserInfo')
      commit('SET_USERINFO', json)
      $storage.sessionStorage.setItem('USER_INFO', json)
    },
    getUserInfoFromStorage({ commit }) {
      return new Promise(resolve => {
        const info = $storage.sessionStorage.getItem('USER_INFO')
        if (!info) return
        commit('SET_USERINFO', info)
        resolve()
      })
    },
    clearUserInfo() {
      $storage.sessionStorage.removeItem('USER_INFO')
    },
    remeberLoginName({ commit, dispatch }, name) {
      dispatch('clearLoginName')
      commit('SET_LOGIN_NAME', name)
      $storage.localStorage.setItem('USER_LOGIN_NAME', name)
    },
    clearLoginName() {
      $storage.localStorage.removeItem('USER_LOGIN_NAME')
    }
  }
}

export default user
