import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import { Toast } from 'vant'
import { is } from '_css-select@2.0.2@css-select';
Vue.use(Toast);

// 从本地存储获取文章收藏列表
let articleCollection = JSON.parse(localStorage.getItem('article') || '[]');
// 从本地存储获取我的收藏商品
let goodsCollection = JSON.parse(localStorage.getItem('goods') || '[]');
// 获取购物车中的数据
let cart = JSON.parse(localStorage.getItem('mycart') || '[]');
// 获取选中状态
let checkedIds = JSON.parse(localStorage.getItem('checkedIds') || '[]');
// 点赞
let likeNum = JSON.parse(localStorage.getItem('linkNum') || '{}');
// 订单
let orders = JSON.parse(localStorage.getItem('orders') || '[]');
// 添加收货地址
let address = JSON.parse(localStorage.getItem('address') || '[]');
// 默认地址id
let defaultAddressId = JSON.parse(localStorage.getItem('defaultId'));

const store = new Vuex.Store({
    state: {
        articleCollection, // 文章收藏
        goodsCollection, // 商品收藏
        cart, // 购物车数据
        checkedIds, // 购物车选中的数量
        likeNum, // 点赞的数量
        orders, // 订单数据
        address, // 收货地址
        defaultAddressId,
    },
    mutations: {
        addArticle(state, article) { // state相当于this.$store.state article调用this.$store.commit()方法传来的参数
            let articleCollection = state.articleCollection;
            // 判断文章是否存在 存在提示已经收藏 不存在添加
            let isExits = articleCollection.some(item => {
                return item.id == article.id
            });
            if (!isExits) { // 不存在
                article.time = Date.now()
                articleCollection.push(article);
                Toast({
                    message: '收藏成功',
                    duration: 1500
                })
            } else {
                return Toast({
                    message: '您，已收藏了！',
                    duration: 1500
                })
            }
            // 保存到本地存储
            localStorage.setItem('article', JSON.stringify(articleCollection));
        },

        removeArticle(state, id) {
            state.articleCollection = state.articleCollection.filter(item => {
                return item.id !== id
            });
            // 保存到本地存储
            localStorage.setItem('article', JSON.stringify(state.articleCollection));
        },

        addGoodsCollection(state, goods) {
            let isExits = state.goodsCollection.some(item => {
                return item.id == goods.id;
            })

            if (!isExits) { // 不存在
                state.goodsCollection.push(goods);
                Toast({
                    message: '收藏成功',
                    duration: 1500
                });
            } else {
                return Toast({
                    message: '已经收藏了',
                    duration: 1500
                });
            }
            // 保存在本地离线存储
            localStorage.setItem('goods', JSON.stringify(state.goodsCollection));
        },

        removeGoodsCollection(state, id) {
            state.goodsCollection = state.goodsCollection.filter(item => {
                return item.id !== id
            });
            // 保存到本地存储
            localStorage.setItem('goods', JSON.stringify(state.goodsCollection));
        },

        // 点赞
        clickLike(state, id) {
            let isExits = false;
            for (let key in state.likeNum) {
                if (key == id) {
                    state.likeNum[key] += 1;
                    isExits = true;
                }
            }
            if (!isExits) {
                state.likeNum[id] = 1;
            }
            localStorage.setItem('linkNum', JSON.stringify(state.likeNum));
        },

        // 添加购物车
        addCart(state, goods) {
            let isExits = state.cart.some(item => {
                if (item.id == goods.id) { // 存在商品数量加一
                    item.count += goods.count;
                    return true;
                }
            });

            if (!isExits) { // 购物车不存在添加一件商品
                state.cart.push(goods)
                state.checkedIds.push(goods.id);
            }

            // 保存到本地存储
            localStorage.setItem('mycart', JSON.stringify(state.cart));
            localStorage.setItem('checkedIds', JSON.stringify(state.checkedIds));
        },

        removeOneGoods(state, id) {
            state.cart = state.cart.filter(item => {
                return item.id !== id
            });
            state.checkedIds = state.checkedIds.filter(item => {
                return item != id
            })

            // 保存到本地存储
            localStorage.setItem('mycart', JSON.stringify(state.cart));
            localStorage.setItem('checkedIds', JSON.stringify(state.checkedIds));
        },

        updateCartGoods(state, obj) {
            state.cart.some(item => {
                if (item.id === obj.id) {
                    item.count = obj.val;
                    return true;
                }
            })
            localStorage.setItem('mycart', JSON.stringify(state.cart));
        },

        saveSelected(state, id) {
            if (Array.isArray(id)) {
                state.checkedIds = id;
            } else {
                let index = state.checkedIds.indexOf(id)
                if (index != -1) {
                    state.checkedIds.splice(index, 1)
                } else {
                    state.checkedIds.push(id)
                }
            }
            // 保存到本地存储
            localStorage.setItem('checkedIds', JSON.stringify(state.checkedIds))
        },

        // 订单
        submitOrder(state, orderMsg) {
            state.orders = state.orders.concat(orderMsg);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },

        // 删除此订单
        removeOrder(state, index) {
            state.orders.splice(index, 1);
            localStorage.setItem('orders', JSON.stringify(state.orders))
        },

        // 添加收货地址
        addAddress(state, newAddress) {
            let Address = state.address;
            let id = Address.length == 0 ? 1 : Address[Address.length - 1].id + 1;
            // 默认地址
            if (newAddress.isDefault) {
                state.defaultAddressId = id;
                localStorage.setItem('defaultId', id + '');
            }
            newAddress.id = id;
            // 添加一条收货地址
            state.address.push(newAddress);
            // 保存到本地存储
            localStorage.setItem('address', JSON.stringify(state.address))
        },

        // 编辑收货地址
        editAddress(state, cAddress) {
            let id = cAddress.id;
            let index = state.address.findIndex(item => {
                return item.id == id;
            });

            if (id == state.defaultAddressId) {
                // 默认地址
                if (!cAddress.isDefault) {
                    state.defaultAddressId = null;
                    localStorage.setItem('defaultId', 'null');
                }
            } else if (cAddress.isDefault) {
                state.defaultAddressId = id
                localStorage.setItem('defaultId', id + '');
            }

            state.address.splice(index, 0, cAddress);
            state.address.splice(index + 1, 1);
            localStorage.setItem('address', JSON.stringify(state.address));
        }
    },

    getters: {
        getCollectionCount(state) { // 获取收藏的商品的数量
            return state.goodsCollection.length;
        },

        getCartGoodsCount(state) {
            let obj = {
                total: 0
            };
            state.cart.forEach(item => {
                obj.total += item.count;
                obj['count' + item.id] = item.count;
                obj['max' + item.id] = item.max;
            })
            return obj;
        },

        getComputedTotal(state) {
            let obj = {
                count: 0,
                totalMoney: 0
            };
            state.cart.forEach(item => {
                if (state.checkedIds.includes(item.id)) {
                    obj.count += item.count;
                    obj.totalMoney += item.price * item.count
                }
            });
            return obj;
        },

        getAllOrders(state) {
            return state.orders;
        },

        getAllAddress(state) {
            let Address = state.address;
            Address = Address.map(item => {
                let { addressDetail, country, province, name, city, county, tel, id } = item;
                let address = country + province + city + county + addressDetail;
                return {
                    id,
                    name,
                    tel,
                    address,
                };
            })
            return Address;
        },

        getAllEditAddress(state) {
            return state.address;
        },

        getDefaultId(state) {
            return state.defaultAddressId;
        }
    }
})

export default store;