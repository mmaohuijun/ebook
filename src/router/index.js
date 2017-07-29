import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'views/layout/Layout'
// import CaseManage from 'views/case/CaseManage'
import CaseInfo from 'views/case/CaseInfo'
// import Demo from 'views/demo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        { path: 'caseInfo', component: CaseInfo }
        // { path: 'caseManage', component: CaseManage }
      ]
    }
  ]
})
