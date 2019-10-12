<template>
  <div class="orderDetailsContainer">
       <!-- header -->
        <van-nav-bar :z-index="999" title="订单详情" 
        :style="{'height': '59px'}" 
        left-arrow fixed  @click-left="$router.back()">
        </van-nav-bar>
        <van-row type="flex" justify="space-between" class="details-success" align="center">
            <van-col><span class="status">订单状态：已完成</span></van-col>
            <van-col>
                <van-image
                width="117px"
                src="https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/membercenter/order/no-pay_79c2dfe.png"
                />
            </van-col>
        </van-row>
        <van-row class="details-address">
          <p class="recever">
              <span class="user">收货人：{{  order.address && order.address.name }}</span>
              <span class="tel">{{ order.address && order.address.tel }}</span>
          </p>
          <p class="address">
              收货地址：{{ order.address && order.address.address }}
          </p>
        </van-row>

        <van-card
        :num="order.count"
        :price="order.nowPrice"
        :title="order.goods_details"
        :thumb="order.img_src"
        />

        <div class="group_cell">
            <div class="cell">
                <p>订单优惠：<span>订单满68元包邮</span></p>
                <p>订单备注：<span>{{ order.order_msg }}</span></p>
            </div>
            <div class="cell">
                <p>商品总金额：<span>¥ {{ (order.count * order.nowPrice).toFixed(2) }}</span></p>
                <p>运费：<span class="red">¥ 0.00</span></p>
                <p>优惠：<span class="red">¥ 0.00</span></p>
                <p>换鼓励金：<span>¥ 0.00</span></p>
            </div>
            <div class="cell">
                <p>配送方式：<span>顺丰速运 免邮</span></p>
                <p>支付方式：<span>{{ order.pay_style }}</span></p>
                <p>发票类型：<span>个人</span></p>
                <p>发票抬头：<span>{{ order.bill_msg }}</span></p>
            </div>
            <div class="cell_footer">
                总计：<span class="red">¥{{ (order.count * order.nowPrice).toFixed(2) }}</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            index: this.$route.params.index,
            order: {},
        }
    },
    created(){
        this.getCOrder()
    },
    methods:{
        getCOrder(){
            this.order = this.$store.getters.getAllOrders[this.index];
            console.log(this.order)
        }
    }
}
</script>

<style lang="less" scoped>
    .orderDetailsContainer{
        box-sizing: border-box;
        padding-top: 59px;
        min-height: 100vh;
        background: #fff;
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
    .van-card{
        background: #fff;
    }
    .details-success{
        background: #69c1ff;
        height: 100px;
        padding: 0 15px;
        .status{
            color: #fff;
            font-size: 20px;
        }
    }
    .details-address{
        background: #fff;
        padding: 15px 25px;
        font-size: 17px;
        color: #333;
        line-height: 25px;
        p{
            display: flex;
            justify-content: space-between;
        }
    }
    .group_cell{
        padding: 0 20px;
        background: #fff;
        .cell{
            padding: 12px 0;
            border-top: 1px solid #e8e8e8;
            font-size: 14px;
            color: #888;
            p{
                line-height: 31px;
                span{
                    margin-left: 5px;
                }
            }
        }
        .red{
            color: red;
            font-size: 14px;
        }
        .cell_footer{
            height: 51px;
            line-height: 51px;
            font-size: 16px;
            border-top: 1px solid #e8e8e8;
            .red{
                font-size: 15px;
            }
        }
    }
</style>