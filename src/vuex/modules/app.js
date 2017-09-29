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
  },
  CallClient: {
    title: '客户数据',
    name: 'ClientData',
    children: [
      {
        title: '来电客户',
        name: 'CallClient'
      }
    ]
  },
  VisitClient: {
    title: '客户数据',
    name: 'ClientData',
    children: [
      {
        title: '到访客户',
        name: 'VisitClient'
      }
    ]
  },
  DealClient: {
    title: '客户数据',
    name: 'ClientData',
    children: [
      {
        title: '成交客户',
        name: 'DealClient'
      }
    ]
  },
  UnassignedClient: {
    title: '客户数据',
    name: 'ClientData',
    children: [
      {
        title: '未分配客户',
        name: 'UnassignedClient'
      }
    ]
  },
  AddClient: {
    title: '客户数据',
    name: 'ClientData',
    children: [
      {
        title: '新建客户',
        name: 'AddClient'
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
    ifShowSuccessMsg: false,
    errorMsgText: '',
    successMsgText: '',
    firstRoute: '',
    authHasChange: false,
    showAuthAlert: false,
    BASE_PATH: process.env.BASE_PATH // 全局路径
  },
  mutations: {
    SET_SIDEBAR_MENU(state, menu) {
      state.sideBarMenu = menu
      console.log('设置sideBar', menu, state.sideBarMenu)
      // if (!_.isEmpty(menu)) {
      //   // state.sideBarMenu = _.cloneDeep(menu)
      //   state.sideBarMenu = _.cloneDeep(menu)
      // } else {
      //   state.sideBarMenu = []
      // }
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
    TOGGLE_AUTH_CHANGE_STATUS(state, flag) {
      state.authHasChange = flag
    },
    SHOW_AUTH_ALERT(state) {
      state.showAuthAlert = true
      setTimeout(() => {
        state.showAuthAlert = false
      }, 500)
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
    },
    SHOW_SUCCESS_MSG(state, text) {
      state.ifShowSuccessMsg = true
      state.successMsgText = text
      setTimeout(() => {
        state.ifShowSuccessMsg = false
      }, 3000)
    }
  },
  actions: {
    setSideBarMenu({ commit, getters, state }) {
      commit('SET_SIDEBAR_MENU', [])
      const menu = []
      let hasSameMenu = false
      // console.log('setSideBarMenu', getters.auth)
      _.each(getters.auth, key => {
        hasSameMenu = false
        console.log('menu', key, menu)
        _.each(menu, menuItem => {
          // console.log('menuItem', key, menuItem)
          if (menuItem.name === sideBarMenuMap[key].name) {
            _.mergeWith(menuItem, sideBarMenuMap[key], (objValue, srcValue) => {
              if (_.isArray(objValue)) {
                return _.uniq(objValue.concat(srcValue))
              }
            })
            hasSameMenu = true
          }
        })
        if (hasSameMenu) return
        menu.push(sideBarMenuMap[key])
      })
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
    authHasChange({ commit }, flag) {
      commit('TOGGLE_AUTH_CHANGE_STATUS', flag)
    },
    showAuthAlert({ commit }) {
      commit('SHOW_AUTH_ALERT')
    },
    toggleLoginStatus({ commit }, flag) {
      commit('TOGGLE_LOGIN_STATUS', flag)
    },
    toggleLoadingStatus({ commit }, flag) {
      commit('TOGGLE_LOADING_STATUS', flag)
    },
    showErrorMsg({ commit }, text) {
      commit('SHOW_ERROR_MSG', text)
    },
    showSuccessMsg({ commit }, text) {
      commit('SHOW_SUCCESS_MSG', text)
    }
  }
}

export default app
