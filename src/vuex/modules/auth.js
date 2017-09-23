import { router, constantRouterMap, asyncRouterMap } from 'src/router'

const auth = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS(state, routers) {
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ state, commit, getters }) {
      return new Promise(resolve => {
        const authMenus = getters.auth
        let hasSameRouter = false
        const routesMap = []

        // 根据用户权限配置路由
        _.each(authMenus, key => {
          _.each(routesMap, routeItem => {
            hasSameRouter = false
            // 如果路由的name相同则合并子路由
            if (routeItem.name === asyncRouterMap[key].name) {
              _.mergeWith(routeItem, asyncRouterMap[key], (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                  return _.uniq(objValue.concat(srcValue))
                }
              })
              hasSameRouter = true
            }
          })
          if (hasSameRouter) return
          routesMap.push(asyncRouterMap[key])
          commit('SET_ROUTERS', routesMap)
        })
        console.log('添加路由', authMenus)
        router.addRoutes(routesMap)
        resolve()
      })
    }
  }
}

export default auth
