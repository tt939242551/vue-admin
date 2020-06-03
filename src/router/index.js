import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/statistics'},
 
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'statistics': { //数据统计
        path: 'statistics',
        name: 'statistics',
        component: () => import('../views/Statistics.vue')
    },
    'user': { //用户管理
        path: 'user',
        name: 'user',
        component: () => import('../views/User.vue')
    },
    'home': { //首页管理
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    'activity': { //活动管理
        path: 'activity',
        name: 'activity',
        component: () => import('../views/Activity.vue')
    },
    'brand': { //品牌管理
        path: 'brand',
        name: 'brand',
        component: () => import('../views/Brand.vue')
    },
    'goodsref': { //商品推荐
        path: 'goodsref',
        name: 'goodsref',
        component: () => import('../views/Goodsref.vue')
    },
    'discountgoods': { //折扣商品
        path: 'discountgoods',
        name: 'discountgoods',
        component: () => import('../views/Discountgoods.vue')
    },
    'goods': { //商品管理
        path: 'goods',
        name: 'goods',
        component: () => import('../views/Goods.vue')
    },
    'examineGoods': {//待审商品
        path: 'examineGoods',
        name: 'examineGoods',
        component: () => import('../views/ExamineGoods.vue')
    },
    'single': {//单品管理
        path: 'single',
        name: 'single',
        component: () => import('../views/Single.vue')
    },
    'common': {//通用属性
        path: 'common',
        name: 'common',
        component: () => import('../views/Common.vue'),
    },

    'order': {//订单管理
        path: 'order',
        name: 'order',
        component: () => import('../views/Order.vue'),
        beforeEnter: (to, from, next) => {
            next(vm => {
                vm.getgoodslist()
              })
          }
    },
    'userAdmin': {//后台用户管理
        path: 'userAdmin',
        name: 'userAdmin',
        component: () => import('../views/userAdmin.vue'),
    },
    'LifeStyle': {//生活美学
        path: 'LifeStyle',
        name: 'LifeStyle',
        component: () => import('../views/LifeStyle.vue'),
    },
    'coupon': {//优惠券
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/Coupon.vue'),
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