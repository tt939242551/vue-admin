import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
          {
                name: 'statistics', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-stats', // icon类型
                text: '数据统计', // 文本内容
            },
              {
                name: 'user', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-contact', // icon类型
                text: '用户管理', // 文本内容
            },
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '首页管理', // 文本内容
            },
            {
                name: 'activity', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-megaphone', // icon类型
                text: '活动推荐', // 文本内容
            },
            {
                name: 'brand', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-pricetag', // icon类型
                text: '品牌推荐', // 文本内容
            },
            {
                name: 'goodsref', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-briefcase', // icon类型
                text: '商品推荐', // 文本内容
            },
            {
                name: 'discountgoods', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-calculator', // icon类型
                text: '折扣商品', // 文本内容
            },
            {
                name: 'goods', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-settings', // icon类型
                text: '商品管理', // 文本内容
            },
            {
                text: '类别管理',
                type: 'md-filing',
                children: [
                    {
                        type: 'ios-browsers',
                        name: 'single',
                        text: '单品管理'
                    },
                    {
                        type: 'md-bookmarks',
                        name: 'common',
                        text: '通用属性'
                    },
                ]
            },
            {
                name: 'order', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-paper', // icon类型
                text: '订单管理', // 文本内容
            },
            {
                name: 'userAdmin', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-contacts', // icon类型
                text: '后台用户管理', // 文本内容
            },

        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
})

export default store