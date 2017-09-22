import $storage from 'api/storage'

const getters = {
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  no: state => state.user.no,
  type: state => state.user.type,
  auth: state => state.user.auth,
  loginName: () => {
    const loginName = $storage.localStorage.getItem('USER_LOGIN_NAME')
    return loginName
  },
  hasUserInfo: () => {
    const userInfo = $storage.sessionStorage.getItem('USER_INFO')
    console.log('GETTERS hasUserInfo', userInfo, userInfo !== undefined)
    return userInfo !== undefined
  },
  caseId: state => state.cases.caseId,
  caseName: state => {
    const caseName = state.cases.caseName
    const caseNameFromStorage = $storage.sessionStorage.getItem('CASE_NAME')
    if (state.cases.caseId !== '0') {
      return caseName || caseNameFromStorage
    } else {
      return '新建案场'
    }
  },
  loginStatus: state => state.app.hasLogin,
  loadingStatus: state => state.app.isLoading,
  firstRoute: state => state.app.firstRoute,
  sideBarMenuMap: state => state.app.sideBarMenuMap,
  sideBarMenu: state => state.app.sideBarMenu,
  sideBarSelect: state => state.app.sideBarSelect,
  ifShowErrorMsg: state => state.app.ifShowErrorMsg,
  errorMsgText: state => state.app.errorMsgText,
  currentPathName: state => state.app.currentPathName,
  BASE_PATH: state => state.app.BASE_PATH,
  addRouters: state => state.auth.addRouters
}

export default getters
