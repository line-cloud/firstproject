import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import TreeView from "vue-json-tree-view"
import axios from 'axios'
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'

import auth from './auth'
import App from './App'

import homeHeader from './components/homeHeader'
import Pagination from './components/Pagination'
import handKtreeDialog from './components/handKtreeDialog'
import createCase from './components/createCase'
import previewCase from './components/previewCase'
import newTestDialog from './components/newTestDialog'

// import routes from './router-config'
import router from './router'

Vue.component(homeHeader.name, homeHeader)
Vue.component(Pagination.name, Pagination)
Vue.component(handKtreeDialog.name, handKtreeDialog)
Vue.component(createCase.name, createCase)
Vue.component(previewCase.name, previewCase)
Vue.component(newTestDialog.name, newTestDialog)

Vue.prototype.axios = axios
Vue.prototype.$qs = qs;

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(TreeView)

// const router = new VueRouter({
//   mode: 'hash',
//   base: __dirname,
//   routes
// })

// router.beforeEach((to, from, next) => {
//   if (!auth.loggedIn() && to.name !== 'login') {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  router,
  components: { App }
})
