import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Layout from 'views/layout/Layout'

/* 设置 */
const Login = () => import('views/setting/Login')
const ModifyPassword = () => import('views/setting/ModifyPassword')

/* 案场 */
const CaseManage = () => import('views/case/CaseManage')
const CaseDetails = () => import('views/case/CaseDetails')
const CaseInfo = () => import('views/case/CaseInfo')
const CaseProject = () => import('views/case/CaseProject')
const CaseAttrs = () => import('views/case/CaseAttrs')

/* 组织 */
const Organization = () => import('views/organization/Organization')

/* 权限 */
const Authority = () => import('views/authority/Authority')

/* 用户 */
const IntUser = () => import('views/user/IntUser')
const ExtUser = () => import('views/user/ExtUser')

/* 客户数据 */
const CallClient = () => import('views/clientData/CallClient')
const VisitClient = () => import('views/clientData/VisitClient')
const DealClient = () => import('views/clientData/DealClient')
const UnassignedClient = () => import('views/clientData/UnassignedClient')
const AddClient = () => import('views/clientData/AddClient')

Vue.use(Router)

// 全局路径
const path = store.getters.BASE_PATH

// 根据用户权限配置的第一个路由地址(登录后跳转)
const firstRoute = store.getters.auth[0]
store.dispatch('setFirstRoute', firstRoute)

// 路由索引
export const asyncRouterMap = {
  /** 案场 */
  CaseManage: {
    path: `${path}case`,
    component: Layout,
    redirect: `${path}case/index`,
    name: '案场',
    children: [
      { path: 'index', name: 'CaseManage', component: CaseManage },
      { path: ':caseId',
        component: CaseDetails,
        children: [
          { path: 'info', name: 'CaseInfo', component: CaseInfo },
          { path: 'project', name: 'CaseProject', component: CaseProject },
          { path: 'attrs', name: 'CaseAttrs', component: CaseAttrs }
        ]
      }
    ],
    meta: { requiresLogin: true }
  },
  /** 组织 */
  Organization: {
    path: `${path}organization`,
    component: Layout,
    redirect: `${path}organization/index`,
    name: '组织',
    children: [
      { path: 'index', name: 'Organization', component: Organization }
    ],
    meta: { requiresLogin: true }
  },
  /** 权限 */
  Authority: {
    path: `${path}authority`,
    component: Layout,
    redirect: `${path}authority/index`,
    name: '权限',
    children: [
      { path: 'index', name: 'Authority', component: Authority }
    ],
    meta: { requiresLogin: true }
  },
  /** 内部用户 */
  IntUser: {
    path: `${path}user`,
    component: Layout,
    redirect: `${path}user/intUser`,
    name: '用户',
    children: [
      { path: 'intUser', name: 'IntUser', component: IntUser }
    ],
    meta: { requiresLogin: true }
  },
  /** 外部用户 */
  ExtUser: {
    path: `${path}user`,
    component: Layout,
    redirect: `${path}user/extUser`,
    name: '用户',
    children: [
      { path: 'extUser', name: 'ExtUser', component: ExtUser }
    ],
    meta: { requiresLogin: true }
  },
  /** 来电客户 */
  CallClient: {
    path: `${path}client`,
    component: Layout,
    redirect: `${path}client/call`,
    name: '客户数据',
    children: [
      { path: 'call', name: 'CallClient', component: CallClient }
    ],
    meta: { requiresLogin: true }
  },
  /** 到访客户 */
  VisitClient: {
    path: `${path}client`,
    component: Layout,
    redirect: `${path}client/visit`,
    name: '客户数据',
    children: [
      { path: 'visit', name: 'VisitClient', component: VisitClient }
    ],
    meta: { requiresLogin: true }
  },
  /** 成交客户 */
  DealClient: {
    path: `${path}client`,
    component: Layout,
    redirect: `${path}client/deal`,
    name: '客户数据',
    children: [
      { path: 'deal', name: 'DealClient', component: DealClient }
    ],
    meta: { requiresLogin: true }
  },
  /** 未分配客户 */
  UnassignedClient: {
    path: `${path}client`,
    component: Layout,
    redirect: `${path}client/unassigned`,
    name: '客户数据',
    children: [
      { path: 'unassigned', name: 'UnassignedClient', component: UnassignedClient }
    ],
    meta: { requiresLogin: true }
  },
  /** 新建客户 */
  AddClient: {
    path: `${path}client`,
    component: Layout,
    redirect: `${path}client/add`,
    name: '客户数据',
    children: [
      { path: 'add', name: 'AddClient', component: AddClient }
    ],
    meta: { requiresLogin: true }
  }
}

// 通用路由
export const constantRouterMap = [
  // { path: '/', redirect: { name: firstRoute } },
  // { path: `${path}`, redirect: { name: firstRoute } },
  { path: '/', redirect: { name: 'Login' } },
  { path: `${path}`, redirect: { name: 'Login' } },
  {
    path: `${path}login`,
    component: Login,
    name: 'Login'
  },
  {
    path: `${path}setting`,
    component: Layout,
    redirect: `${path}setting/modpsw`,
    name: '设置',
    children: [
      { path: 'modpsw', name: 'ModifyPassword', component: ModifyPassword }
    ],
    meta: { requiresLogin: true }
  }
  // {
  //   path: '*',
  //   name: 'Login',
  //   component: Login
  // }
]

const routesMap2 = [
  { path: '/', redirect: { name: 'Login' } },
  { path: `${path}`, redirect: { name: 'Login' } },
  {
    path: `${path}login`,
    component: Login,
    name: 'Login'
  },
  {
    path: `${path}setting`,
    component: Layout,
    redirect: `${path}setting/modpsw`,
    name: '设置',
    children: [
      { path: 'modpsw', name: 'ModifyPassword', component: ModifyPassword }
    ],
    meta: { requiresLogin: true }
  },
  {
    path: `${path}case`,
    component: Layout,
    redirect: `${path}case/index`,
    name: '案场',
    children: [
      { path: 'index', name: 'CaseManage', component: CaseManage },
      { path: ':caseId',
        component: CaseDetails,
        children: [
          { path: 'info', name: 'CaseInfo', component: CaseInfo },
          { path: 'project', name: 'CaseProject', component: CaseProject },
          { path: 'attrs', name: 'CaseAttrs', component: CaseAttrs }
        ]
      }
    ],
    meta: { requiresLogin: true, requiresAuth: true }
  },
  {
    path: `${path}organization`,
    component: Layout,
    redirect: `${path}organization/index`,
    name: '组织',
    children: [
      { path: 'index', name: 'Organization', component: Organization }
    ],
    meta: { requiresLogin: true, requiresAuth: true }
  },
  {
    path: `${path}authority`,
    component: Layout,
    redirect: `${path}authority/index`,
    name: '权限',
    children: [
      { path: 'index', name: 'Authority', component: Authority }
    ],
    meta: { requiresLogin: true, requiresAuth: true }
  },
  {
    path: `${path}user`,
    component: Layout,
    redirect: `${path}user/intUser`,
    name: '用户',
    children: [
      { path: 'intUser', name: 'IntUser', component: IntUser },
      { path: 'extUser', name: 'ExtUser', component: ExtUser }
    ],
    meta: { requiresLogin: true, requiresAuth: true }
  },
  {
    path: `${path}client`,
    component: Layout,
    redirect: `${path}client/call`,
    name: '客户数据',
    children: [
      { path: 'call', name: 'CallClient', component: CallClient },
      { path: 'visit', name: 'VisitClient', component: VisitClient },
      { path: 'deal', name: 'DealClient', component: DealClient },
      { path: 'unassigned', name: 'UnassignedClient', component: UnassignedClient },
      { path: 'add', name: 'AddClient', component: AddClient }
    ],
    meta: { requiresLogin: true, requiresAuth: true }
  },
  {
    path: '*',
    name: 'Login',
    component: Login
  }
]

export const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap2
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', to, from)

  if (from.name === 'Authority') {
    if (store.getters.authHasChange) {
      store.dispatch('showAuthAlert')
      return
    }
  }

  // 检查页面是否需要登录
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // 若没有登录或没有用户信息则跳转登录页
    if (store.getters.loginStatus || store.getters.hasUserInfo) {
      if (store.getters.auth.length === 0) {
        store.dispatch('getUserInfoFromStorage')
      }
      if (to.matched.some(record => record.meta.requiresAuth)) {
        let toName = to.name
        if (to.name === 'CaseInfo' || to.name === 'CaseAttrs' || to.name === 'CaseProject') {
          toName = 'CaseManage'
        }
        // 检查是否有权限
        if (_.indexOf(store.getters.auth, toName) !== -1) {
          // 判断url后面是否带有参数
          if (!_.isEmpty(to.params)) {
            if (to.params.caseId) {
              const caseId = to.params.caseId
              store.dispatch('setCaseId', caseId)
            }
          }
          next()
        } else {
          store.dispatch('showErrorMsg', '抱歉, 您没有权限访问!')
        }
      } else {
        next()
      }
    } else {
      next({ name: 'Login' })
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

// 路由跳转后记录下当前路径名
router.afterEach(route => {
  store.dispatch('setCurrentPathName', route.name)
  store.dispatch('setSideBarSelect', route.name)
  // 包含'Case'的页面
  if (route.path.indexOf('case') !== -1) {
    store.dispatch('setSideBarSelect', 'CaseManage')
  }
})

// export default router

