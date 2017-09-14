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

/* 用户 */
const IntUser = () => import('views/user/IntUser')
const ExtUser = () => import('views/user/ExtUser')

Vue.use(Router)

const path = store.getters.BASE_PATH

const routesMap = [
  { path: '/', redirect: `${path}case` },
  { path: `${path}`, redirect: `${path}case` },
  {
    path: `${path}login`,
    component: Login,
    name: 'Login'
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
    meta: { requiresLogin: true }
  },
  {
    path: `${path}organization`,
    component: Layout,
    redirect: `${path}organization/index`,
    name: '组织',
    children: [
        { path: 'index', name: 'Organization', component: Organization }
    ],
    meta: { requiresLogin: true }
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
    meta: { requiresLogin: true }
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
    path: '*',
    name: 'Login',
    component: Login
  }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', to, from, 'path', path)
  store.dispatch('setSideBarSelect', to.name)
  if (to.path.indexOf('case') !== -1) { // 包含'Case'的页面
    store.dispatch('setSideBarSelect', 'CaseManage')
  }

  // 检查页面是否需要登录
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // 若没有登录或没有用户信息则跳转登录页
    if (store.getters.loginStatus || store.getters.hasUserInfo) {
      store.dispatch('getUserInfoFromStorage')
      // 判断url后面是否带有参数
      if (!_.isEmpty(to.params)) {
        if (to.params.caseId) {
          const caseId = to.params.caseId
          store.dispatch('setCaseId', caseId)
        }
      }
      next()
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
})

export default router
