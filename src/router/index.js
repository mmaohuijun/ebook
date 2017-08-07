import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'views/layout/Layout'
import CaseManage from 'views/case/CaseManage'
import CaseInfo from 'views/case/CaseInfo'
import User from 'views/user/user'
import Login from 'views/login'

Vue.use(Router)

export default new Router({
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
        { path: 'caseInfo/:id', name: 'CaseInfo', component: CaseInfo },
        { path: 'user', name: 'User', component: User }
      ]
    }
  ]
})
