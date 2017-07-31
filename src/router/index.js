import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'views/layout/Layout'
import CaseManage from 'views/case/CaseManage'
import CaseInfo from 'views/case/CaseInfo'
import user from 'views/user/user'
import Login from 'views/login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // {path: '/', redirect: '/layout'},
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        { path: '', component: CaseManage },
        { path: 'caseInfo/:id', component: CaseInfo },
        { path: 'user', component: user }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
