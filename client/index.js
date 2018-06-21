import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import createRouter from './config/router.js'
import createStore from './store/store.js'

import './assets/styles/global.less';

Vue.use(VueRouter)
Vue.use(Vuex);
var router = createRouter();
var store = createStore();



new Vue({
  router,
  store,
	render:(h) => h(App)
}).$mount('#root');
