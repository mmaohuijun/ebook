import $storage from 'api/storage'

const getters = {
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  no: state => state.user.no,
  loginName: () => {
    const loginName = $storage.localStorage.getItem('USER_LOGIN_NAME')
    return loginName
  },
  hasUserInfo: () => {
    const userInfo = $storage.sessionStorage.getItem('USER_INFO')
    return userInfo !== undefined
  },
  caseId: state => state.cases.caseId,
  caseName: () => {
    const caseName = $storage.sessionStorage.getItem('CASE_NAME')
    return caseName
  }
}

export default getters
