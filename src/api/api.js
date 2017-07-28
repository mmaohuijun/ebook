import axios from 'axios'
// import store from '../vuex/store'

const devURL = 'http://172.18.84.65:9088/marketing/api/'

const proURL = ''

const ajaxUrl = process.env.NODE_ENV === 'production' ? proURL : devURL

const $axios = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

const responseStatus = {
  ok: '000', // 成功
  customerError: '001', // 后台自定义错误
  sessiontimeout: '008', // 未登录或会话已失效
  requestError: '999' // 请求错误
}

// const dev = {
//   'case-list': 'case/list'
// }

// 添加请求拦截器
// $axios.interceptors.request.use(config => {
//   // 在发送请求之前做些什么
//   console.log('config', config)
//   return config
// }, error => {
//   // 对请求错误做些什么
//   console.log(error)
//   return Promise.reject(error)
// })

// 添加响应拦截器
$axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  // console.log('response', response)
  const retStatus = response.data.retStatus
  // const retMsg = response.data.retMsg
  // console.log('retStatus', retStatus)
  // console.log('retMsg', retMsg)
  if (retStatus === responseStatus.sessiontimeout) {
    // console.log('sessiontimeout', retMsg)
  }
  return response.data
}, error => {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

export default $axios
