import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Layout from 'views/layout/Layout'
import CaseManage from 'views/case/CaseManage'
import CaseDetails from 'views/case/CaseDetails'
import CaseInfo from 'views/case/CaseInfo'
import CaseProject from 'views/case/CaseProject'
import CaseAttrs from 'views/case/CaseAttrs'
import IntUser from 'views/user/IntUser'
import ExtUser from 'views/user/ExtUser'
import Login from 'views/setting/Login'
import Organization from 'views/organization/Organization'

Vue.use(Router)

const path = store.state.NODE_PATH

const router = new Router({
  mode: 'history',
  routes: [
    // { path: '/', redirect: `${path}web-admin` },
    {
      path: `${path}login`,
      name: 'Login',
      component: Login
    },
    {
      path: `${path}`,
      component: Layout,
      children: [
        { path: '', name: 'CaseManage', component: CaseManage },
        { path: 'case/:caseId',
          component: CaseDetails,
          children: [
            { path: '', name: 'CaseInfo', component: CaseInfo },
            { path: 'caseProject', name: 'CaseProject', component: CaseProject },
            { path: 'caseAttrs', name: 'CaseAttrs', component: CaseAttrs }
          ]
        },
        { path: 'organization', name: 'Organization', component: Organization },
        { path: 'intUser', name: 'IntUser', component: IntUser },
        { path: 'extUser', name: 'ExtUser', component: ExtUser }
      ],
      meta: { requiresLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', to, from, 'path', path)
  store.commit('initSideBar', to.name)
  if (to.name.indexOf('Case') !== -1) { // 包含'Case'的页面
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
