import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router'
import createRouter from './config/router.js'

import './assets/styles/global.less';

Vue.use(VueRouter)
var router = createRouter();



new Vue({
  router,
	render:(h) => h(App)
}).$mount('#root');
