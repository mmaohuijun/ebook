import axios from 'axios'
import store from '../vuex/store'
import { router } from '../router'
import qs from 'qs'

const $axios = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true,
  transformRequest: [function(data) {
    // 对 data 进行转换处理, 如果是FormData(图片上传)则直接返回, 否则处理后返回
    return data instanceof FormData ? data : qs.stringify(data)
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
  store.dispatch('toggleLoadingStatus', true)
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
  store.dispatch('toggleLoadingStatus', false)
  // 对响应数据做点什么
  const retCode = response.data.retCode
  const retMsg = response.data.retMsg

  if (retCode === responseStatus.ok) {
    return response.data
  } else if (retCode === responseStatus.sessiontimeout) {
    console.log('sessiontimeout')
    store.dispatch('toggleLoginStatus', false)
    store.dispatch('clearUserInfo')
    router.push({ name: 'Login' })
    return null
  } else { // 请求不成功, 提示错误信息
    store.dispatch('showErrorMsg', retMsg)
    return null
  }
}, error => {
  // store.commit('hideLoading')
  store.dispatch('toggleLoadingStatus', false)
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

export default $axios
