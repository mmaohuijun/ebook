import axios from 'axios'
import store from '../vuex/store'
import qs from 'qs'

const devURL = 'http://172.18.84.75:88/admin/'
// const devURL = 'http://172.18.84.75:8801/admin/'
// const proURL = 'http://zhongnan.masadata.com/admin/'
const proURL = 'http://zhongnan.masadata.com/admin-test'

const ajaxUrl = process.env.NODE_ENV === 'production' ? proURL : devURL

const $axios = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true,
  transformRequest: [function(data) {
    // 对 data 进行任意转换处理
    return qs.stringify(data)
  }]
})

const responseStatus = {
  ok: '000', // 成功
  sessiontimeout: '003', // 未登录或会话已失效
  noAuthority: '004', // 权限不足
  customerError: '001', // 后台自定义错误
  requestError: '999' // 请求错误
}

// 添加请求拦截器
$axios.interceptors.request.use(config => {
  store.commit('showLoading')
  // 在发送请求之前做些什么
  // console.log('axios Config', config)
  return config
}, error => {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
$axios.interceptors.response.use(response => {
  store.commit('hideLoading')
  // 对响应数据做点什么
  // console.log('响应response', response)
  const retCode = response.data.retCode
  const retMsg = response.data.retMsg

  if (retCode === responseStatus.ok) {
    return response.data
  } else if (retCode === responseStatus.sessiontimeout) {
    store.commit('notLogin')
    store.dispatch('clearUserInfo')
    return null
  } else { // 请求不成功, 提示错误信息
    store.commit('showErrorMsg', retMsg)
    return null
  }
}, error => {
  store.commit('hideLoading')
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

export default $axios
