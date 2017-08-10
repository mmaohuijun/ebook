import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Layout from 'views/layout/Layout'
import CaseManage from 'views/case/CaseManage'
import CaseInfo from 'views/case/CaseInfo'
import IntUser from 'views/user/IntUser'
import ExtUser from 'views/user/ExtUser'
import Login from 'views/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // {path: '/', redirect: '/layout'},
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', name: 'CaseManage', component: CaseManage },
        { path: 'caseInfo/:caseId', name: 'CaseInfo', component: CaseInfo },
        { path: 'intUser', name: 'IntUser', component: IntUser },
        { path: 'extUser', name: 'ExtUser', component: ExtUser }
      ],
      meta: { requiresLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', to, from)
  store.commit('initSideBar', to.name)
  // 检查route是否有meta信息
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // 检查页面是否需要登录, 若没有登录则跳转登录页
    if (!store.getters.getLoginStatus) {
      next({ path: '/login' })
    } else {
      // 判断url后面是否带有参数
      if (!_.isEmpty(to.params)) {
        if (to.name === 'CaseInfo') {
          const caseId = to.params.caseId
          store.commit('initCaseId', caseId)
        }
      }
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
  next()
})

export default router
