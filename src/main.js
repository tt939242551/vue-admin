import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import qs from	'qs'
import 'iview/dist/styles/iview.css'
import './permission'
/* import echarts from 'echarts'
Vue.prototype.$echarts = echarts */

Vue.config.productionTip = false
Vue.use(iView)

// 设置基础URL
axios.defaults.baseURL = 'http://sfstyling.bogole.com'
// 设置请求超时时间
axios.defaults.timeout = 5000

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
