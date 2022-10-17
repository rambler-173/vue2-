import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/less/index.less';

import store from './store';
import router from "./router";
import http from 'axios';
import './api/mock'
import Cookie from 'js-cookie'

Vue.use(ElementUI);

Vue.prototype.$http = http

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if(!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if ( token && to.name === 'login' ) {
    next({name: 'home' })
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
}).$mount('#app')
