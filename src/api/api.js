import axios from 'axios'
import store from '../vuex/store'
import qs from 'qs'

const devURL = 'http://172.18.84.75:8080/admin/'
const proURL = ''

const ajaxUrl = process.env.NODE_ENV === 'production' ? proURL : devURL

const $axios = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function(data) {
    // 对 data 进行任意转换处理
    return qs.stringify(data)
  }]
})

const responseStatus = {
  ok: '000', // 成功
  notBind: '003', // 身份未验证
  noAuthority: '004', // 权限不足
  customerError: '001', // 后台自定义错误
  sessiontimeout: '008', // 未登录或会话已失效
  requestError: '999' // 请求错误
}

// 添加请求拦截器
$axios.interceptors.request.use(config => {
  store.commit('showLoading')
  // 在发送请求之前做些什么
  console.log('axios Config', config)
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
  console.log('响应response', response)
  const retStatus = response.data.retStatus

  if (retStatus === responseStatus.sessiontimeout) {
  }
  return response.data
}, error => {
  store.commit('hideLoading')
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

export default $axios
