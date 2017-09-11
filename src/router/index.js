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

const path = store.state.NODE_PATH

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: `${path}case` },
    { path: `${path}`, redirect: `${path}case` },
    {
      path: `${path}login`,
      name: 'Login',
      component: Login
    },
    {
      path: `${path}`,
      component: Layout,
      children: [
        { path: 'case', name: 'CaseManage', component: CaseManage },
        { path: 'case/:caseId',
          component: CaseDetails,
          children: [
            // { path: 'info', name: 'CaseInfo', component: CaseInfo },
            { path: 'info', name: '案场详情', component: CaseInfo },
            { path: 'project', name: 'CaseProject', component: CaseProject },
            { path: 'attrs', name: 'CaseAttrs', component: CaseAttrs }
          ]
        },
        { path: 'organization', name: 'Organization', component: Organization },
        { path: 'intUser', name: 'IntUser', component: IntUser },
        { path: 'extUser', name: 'ExtUser', component: ExtUser },
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
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', to, from, 'path', path)
  store.commit('initSideBar', to.name)
  if (to.path.indexOf('case') !== -1) { // 包含'Case'的页面
    store.commit('initSideBar', 'CaseManage')
  }

  // 检查页面是否需要登录
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // 若没有登录或没有用户信息则跳转登录页
    if (store.getters.getLoginStatus || store.getters.hasUserInfo) {
      store.dispatch('getUserInfo')
      // 判断url后面是否带有参数
      if (!_.isEmpty(to.params)) {
        if (to.params.caseId) {
          const caseId = to.params.caseId
          store.commit('initCaseId', caseId)
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
  store.commit('initPathName', route.name)
})

export default router
