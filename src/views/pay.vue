<template>
  <div class="payContainer">
    <!-- header -->
    <van-nav-bar :z-index="999" title="结算" 
    :style="{'height': '59px'}" 
    left-arrow fixed  
    @click-left="$router.back()">
    </van-nav-bar>

    <van-row class="details-address">
        <router-link :to="'/address?id=' + id + '&value=' + count" :style="{'color': 'inherit'}">
            <p class="recever">
                <span class="user">收货人：{{ address && address.name }}</span>
                <span class="tel">{{ address && address.tel }}</span>
            </p>
            <p class="address">
                收货地址：{{ address && address.address }}
            </p>
            <van-icon name="arrow" class="selected_address" size="22px"/>
        </router-link>
    </van-row>
    <van-panel title="商品清单">
        <van-card
        v-for="item in goods"
        :num="item.count"
        :key="item.id"
        :price="item.nowPrice"
        :title="item.goods_details"
        :thumb="item.img_src"
        />
    </van-panel>
    
    <van-panel title="发票信息">
        <div class="bill">
            <p>*请输入发票抬头:</p>
            <input type="text" placeholder="请输入发票信息" v-model.trim="bill_msg">
        </div>
    </van-panel>

    <van-panel title="支付方式">
        <div class="pay_style">
            <div class="tab_navs">
                <span v-for="(item, i) in tabs" :key="item" @click="index = i" :class="{'active': index == i}">{{ item }}</span>
            </div>
            <div class="tab_panel">
                <p v-show="index == 0">支持支付宝支付、微信支付、银行卡支付、财付通等</p>
                <p v-show="index == 1">花呗分期是花呗联合天猫淘宝推出的，面向互联网的赊购服务，通过支付宝轻松还款，0首付</p>
                <p v-show="index == 2">货到再付款，支持现金交易</p>
            </div>
        </div>
    </van-panel>

    <van-panel title="订单留言">
        <div class="order_msg">
          <textarea name="msg"  placeholder="限300字（若有特殊需求，请联系商城在线客服)" 
          rows="5" maxlength="300"
          v-model.trim="order_msg"
          ></textarea>
          <p>商品总金额：¥<span style="margin-left: 4px;">
              {{ totalMoney }}
          </span></p>
          <p>运费：0.00</p>
          <p>优惠：¥0.00</p>
          <p>赠送积分：{{ totalMoney }}</p>
        </div>
    </van-panel>

    <div class="pay_foot">
        <p>订单总金额：<span>¥&nbsp;{{ totalMoney }}</span></p>
        <span class="account" @click="payMoney">立即结算</span>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tabs: ['在线支付', '花呗分期', '货到付款'],
            index: 0,
            bill_msg: '',
            order_msg: '',
            id: this.$route.query.id,
            count: this.$route.query.value,
            type: this.$route.query.type,
            selected: this.$route.query.selected,
            address: null, // 地址
            goods: [], // 所有的商品
            totalMoney: 0
        }
    },
    created(){
        this.getGoodsList()
        this.getAddress()
    },
    methods:{
        getGoodsList(){
            this.$axios.get('/api/getAllGoods').then(res=>{
                if(res.status == 200){
                    if(this.type == 'cart'){
                        let cartGoods = {};
                        this.$store.state.cart.forEach(item=> {
                            cartGoods[item.id] = item.count;
                        });
                        let ids = Object.keys(cartGoods);
                        // 获取购物车数据
                        res.data.forEach(item=>{
                            if(ids.includes(item.id)){
                                item.count = cartGoods[item.id];
                                this.goods.push(item)
                            }
                        });
                    }else{
                        let cGoods = res.data.find(item=>{
                            return item.id === this.id;
                        });
                        cGoods.count = this.count;
                        this.goods.push(cGoods);
                    }
                    this.computedTotal();
                }else{
                    this.$toast('获取商品失败')
                }
            })
        },
        payMoney(){
            if(this.bill_msg && this.address){
                // 收集订单信息
                let orders = this.goods.map(item=>{
                    let orderMsg = {...item}
                    orderMsg.pay_style = this.tabs[this.index];
                    orderMsg.bill_msg = this.bill_msg;
                    orderMsg.order_msg = this.order_msg;
                    orderMsg.count = item.count;
                    orderMsg.address = this.address;
                    return orderMsg;
                });
                console.log(orders);
                // 提交订单信息
                this.$store.commit('submitOrder', orders);
                // 支付成功
                this.$router.push('/success')
            }else if(!this.address){
                this.$toast({
                    message: '请填写收货地址',
                    duration: 1200
                })
            }else{
                this.$toast({
                    message: '请填写发票头',
                    duration: 1200
                })
            }
        },
        getAddress(){
            let defaultid = this.$store.getters.getDefaultId;
            if(this.selected){
                let All= this.$store.getters.getAllAddress;
                this.address = All.find(item=>{
                    return item.id === this.selected
                });
            }else if(defaultid){
                this.address = this.$store.getters.getAllAddress.find(item=>{
                    return item.id == defaultid
                })
            }
            
        },
        computedTotal(){
            let goods = this.goods;
            if(goods.length == 1){
                this.totalMoney = (this.count * goods[0].nowPrice).toFixed(2)
            }else{
                this.totalMoney = this.$store.getters.getComputedTotal.totalMoney.toFixed(2)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .van-card__content{
        justify-content: space-around;
        .van-card__title{
            font-size: 16px;
        }
        .van-card__bottom{
            font-size: 14px;
        }
    }
    .active{
        color: red;
    }
    .payContainer{
        padding-top: 59px;
        background: #fff;
        padding-bottom: 62px;
        .van-nav-bar__title{
            line-height: 59px;
            font-size: 19px;
        }
        .van-nav-bar__left{
            bottom: 8px;
            font-size: 17px;
            .van-nav-bar__text{
                color: #333;
            }
            i{
                color: #333;
                font-size: 24px;
            }
        }
        .van-nav-bar__right{
          bottom: 8px;
          i{
          color: #333;
          }
        }
    }
    .details-address{
        min-height: 115px;
        position: relative;
        &::before{
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 4px;
            position: absolute;
            content: '';
            background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 15px, transparent 0, transparent 30px, #1989fa 0, #1989fa 45px, transparent 0, transparent 60px);
        }
        background: #fff;
        padding: 15px 25px;
        font-size: 16px;
        color: #666;
        line-height: 25px;
        p{
            display: flex;
            margin-bottom: 5px;
            justify-content: space-between;
        }
        .selected_address{
            position: absolute;
            right: 15px;
            bottom: 18px;
        }
    }
    .tab_panel{
        min-height: 65px;
    }
    .van-panel{
        border-top: 8px solid #f4f4f4;
        .van-panel__header{
            padding: 21px 29px;
            color: #333;
            border-bottom: 1px solid #eaeaea;
            font-size: 16px;
        }
        .van-card{
            background: #fff;
        }
         .van-panel__content{
            padding: 0 15px;
            padding-bottom: 20px;
        }
        .bill{
            font-size: 14px;
            p{
                color: #333;
                margin: 10px 0;
            }
            input{
                border: none;
                outline: none;
                border-radius: 4px;
                display: block;
                width: 100%;
                border:1px solid #d1d1d1;
                box-shadow: 0 0 2px #d1d1d1;
                height: 48px;
                line-height: 48px;
                text-indent: 5px;
                &::placeholder{
                    color: #d1d1d1;
                }
            }
        }
        .pay_style{
            .tab_navs {
                display: flex;
                padding-top: 5px;
                justify-content: center;
                span{
                    margin: 4px;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    width: 117px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    box-shadow: 0 0 3px #d1d1d1;
                }
            }
            .tab_panel{
                width: 96%;
                border-radius: 3px;
                border: 1px solid #d1d1d1;
                padding: 12px;
                margin: auto;
                box-shadow: 0 0 3px #d1d1d1;
                margin-top: 10px;
            }
        }
        .order_msg{
            padding-top: 15px;
            textarea{
                border:1px solid #d1d1d1;
                box-shadow: 0 0 2px #d1d1d1;
                display: block;
                width: 96%;
                padding: 6px 8px;
                border-radius: 2px;
                height: 80px;
                margin: auto;
                margin-bottom: 15px;
            }
            p{
                margin: auto;
                color: #888;
                font-size: 14px;
                padding-left: 10px;
            }
        }
    }
     .pay_foot{
            height: 62px;
            position: fixed;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            bottom: 0;
            padding: 0 12px;
            z-index: 1000;
            background: #fff;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #d1d1d1;
           p{
               font-size: 18px;
               line-height: 62px;
               span{
                   color: red;
               }
           }
           .account{
               border-radius: 30px;
               width: 136px;
               height: 37px;
               background: red;
               color: #fff;
               font-size: 14px;
               line-height: 37px;
               text-align: center;
           }
        }
</style>