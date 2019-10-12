import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/views/home.vue'
import Classify from '@/views/classify.vue'
import News from '@/views/news.vue'
import About from '@/views/about.vue'
import Login from '@/views/login.vue';
import Choose from '@/views/choose.vue';
import Parts from '@/views/parts.vue';
import GoodsDetailes from '@/views/goodsDetails.vue';
import NewsDetails from '@/views/newsDetails.vue';
import Order from '@/views/order.vue';
import orderDetails from '@/views/orderDetails.vue';
import Address from '@/views/address.vue';
import AddAddress from '@/views/addAddress.vue';
import MyCollection from '@/views/myCollection.vue';
import MyCart from '@/views/myCart.vue';
import Pay from '@/views/pay.vue';
import Success from '@/views/success.vue';
import EditAddress from '@/views/editAddress.vue';
import AboutMe from '@/views/aboutMe.vue';


export default new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        { path: '', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/classify', component: Classify },
        { path: '/news', component: News },
        { path: '/about', component: About },
        { path: '/login', component: Login },
        { path: '/parts', component: Parts },
        { path: '/choose', component: Choose },
        { path: '/goodsdetails/:id', component: GoodsDetailes },
        { path: '/newsDetails/:id', component: NewsDetails },
        { path: '/order', component: Order },
        { path: '/orederDetails/:index', component: orderDetails },
        { path: '/address', component: Address },
        { path: '/add_Address', component: AddAddress },
        { path: '/myCollection', component: MyCollection },
        { path: '/myCart', component: MyCart },
        { path: '/pay', component: Pay },
        { path: '/success', component: Success },
        { path: '/editAddress/:id', component: EditAddress },
        { path: '/aboutme', component: AboutMe },
    ]
})