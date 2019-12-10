import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/home'},
 
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'statistics': {
        path: 'statistics',
        name: 'statistics',
        component: () => import('../views/Statistics.vue')
    },
    'user': {
        path: 'user',
        name: 'user',
        component: () => import('../views/User.vue')
    },
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    'activity': {
        path: 'activity',
        name: 'activity',
        component: () => import('../views/Activity.vue')
    },
    'brand': {
        path: 'brand',
        name: 'brand',
        component: () => import('../views/Brand.vue')
    },
    'goodsref': {
        path: 'goodsref',
        name: 'goodsref',
        component: () => import('../views/Goodsref.vue')
    },
    'discountgoods': {
        path: 'discountgoods',
        name: 'discountgoods',
        component: () => import('../views/Discountgoods.vue')
    },
    'goods': {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/Goods.vue')
    },
    'single': {
        path: 'single',
        name: 'single',
        component: () => import('../views/Single.vue')
    },
    'common': {
        path: 'common',
        name: 'common',
        component: () => import('../views/Common.vue'),
    },
    'order': {
        path: 'order',
        name: 'order',
        component: () => import('../views/Order.vue'),
        beforeEnter: (to, from, next) => {
            next(vm => {
                vm.getgoodslist()
              })
          }
    },
}

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router