const sideBarMenuMap = {
  CaseManage: {
    title: '案场',
    name: 'CaseManage',
    children: []
  },
  Organization: {
    title: '组织',
    name: 'Organization',
    children: []
  },
  Authority: {
    title: '权限',
    name: 'Authority',
    children: []
  },
  IntUser: {
    title: '用户',
    name: 'User',
    children: [
      {
        title: '内部用户',
        name: 'IntUser'
      }
    ]
  },
  ExtUser: {
    title: '用户',
    name: 'User',
    children: [
      {
        title: '外部用户',
        name: 'ExtUser'
      }
    ]
  }
}

const app = {
  state: {
    sideBarMenuMap,
    sideBarMenu: [],
    sideBarSelect: '', // 侧边栏当前选择
    currentPathName: '', // 当前路径
    hasLogin: false, // 是否登录
    isLoading: false, // 加载中...
    ifShowErrorMsg: false,
    errorMsgText: '',
    firstRoute: '',
    BASE_PATH: process.env.BASE_PATH // 全局路径
  },
  mutations: {
    SET_SIDEBAR_MENU(state, menu) {
      state.sideBarMenu = menu
    },
    SET_SIDEBAR_SELECT(state, str) {
      state.sideBarSelect = str
    },
    SET_CURRENT_PATH(state, path) {
      state.currentPathName = path
    },
    SET_FIRST_ROUTE(state, route) {
      state.firstRoute = route
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
    setSideBarMenu({ commit }, menu) {
      commit('SET_SIDEBAR_MENU', menu)
    },
    setSideBarSelect({ commit }, str) {
      commit('SET_SIDEBAR_SELECT', str)
    },
    setCurrentPathName({ commit }, pathName) {
      commit('SET_CURRENT_PATH', pathName)
    },
    setFirstRoute({ commit }, route) {
      commit('SET_FIRST_ROUTE', route)
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
