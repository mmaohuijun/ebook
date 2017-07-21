const routers = [
    {
        path: '/',
        meta: {
            title: '案场管理'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/fieldDetail',
        meta: {
            title: '案场管理'
        },
        component: require('./views/fieldDetail.vue')
    },
    {
        path: '/login',
        meta: {
            title: '案场管理'
        },
        component: require('./views/login.vue')
    },
    {
        path: '/user_list',
        meta: {
            title: '内部用户'
        },
        component: require('./views/user_list.vue')
    }
];
export default routers;