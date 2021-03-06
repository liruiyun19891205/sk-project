// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import Routers from './router'
import Vuex from 'vuex';
import Util from './libs/util'
import App from './app.vue';
import store from './vuex'
import {
  sync
} from 'vuex-router-sync'
import VueLocalStorage from 'vue-ls';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/style/admin.css';
import moment from "moment";


Vue.config.productionTip = false

// 加载vueRouter
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

Vue.use(VueLocalStorage, {
  namespace: 'sk-'
});

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
};
const router = new VueRouter(RouterConfig);

// router.beforeEach(async (to, from, next) => {

//   iView.LoadingBar.start();
//   Util.title(to.meta.title)

//   let token = Vue.ls.get("token");
//   if (token) {
//     store.dispatch('admin/auth').then(() => {
//       next()
//     }).catch(ret => {
//       setTimeout(() => {
//         next('/login')
//       }, 1500);
//     })

//   } else {
//     // 判断是否需要登录
//     if (!!to.meta.noAuth) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// });

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

sync(store, router)

/* eslint-disable no-new */
/**
 * 试驾过滤器
 */
Vue.filter('dateFormat', function (date, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) return ''
  return moment(date).format(format)
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
