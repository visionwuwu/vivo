import Vue from 'vue'
import './assets/css/normalize.css'

import App from './App.vue'
import router from './router'
import './mockjs/index.js'

import Axios from 'axios';
Vue.prototype.$axios = Axios;

import store from './vuex/index.js';

import Vant, { Lazyload, Toast } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Toast);


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')