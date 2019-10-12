<template>
  <div class="orderContainer">
    <!-- header -->
    <van-nav-bar :z-index="999" title="我的订单" 
     :style="{'height': '59px'}" 
    left-arrow fixed  @click-left="$router.back()">
    </van-nav-bar>
    <van-tabs 
        v-model="active"
        color="#199cfe"
        animated
        title-active-color="#199cfe"
        line-height="2px">
        <van-tab title="全部">
            <div class="empty" v-if="$store.getters.getAllOrders.length == 0">
                <img src="../assets/images/empty.png">
                <p>暂无数据</p>
            </div>
            <van-panel 
            icon="gem-o" 
            title="vivo官方旗舰店" 
            status="已完成"
            v-for="(item, index) in $store.getters.getAllOrders"
            :key="index"
            v-else
            >
                <div class="goods_content">
                    <van-card
                    :thumb="item.img_src"
                    >
                    <div slot="title" class="goods_tit">
                        <h3>{{ item.goods_details }}</h3>
                        <span slot="price" class="goods_price">&yen;{{ item.nowPrice }}</span>
                    </div>
                    <span slot="num" class="goods_num">× {{ item.count }}</span>
                    </van-card>
                </div>
                <div slot="footer" class="goods_footer">
                    <van-row type="flex" justify="end" gutter="15">
                        <van-col span="6">共计<span>{{ item.count }}</span>件商品</van-col>
                        <van-col span="6">总计：<span class="total">&yen;{{ (item.count * item.nowPrice).toFixed(2) }}</span></van-col>
                    </van-row>
                    <van-row type="flex" justify="end" gutter="15">
                        <van-col span="12">(含运费：&yen;0.00&yen;0.00)</van-col>
                    </van-row>
                    <van-row type="flex" justify="end">
                        <van-button size="small" @click="removeOrder(index)">删除订单</van-button>
                        <van-button size="small" :to="'/orederDetails/' + index">订单详情</van-button>
                    </van-row>
                </div>
            </van-panel>
        </van-tab>
        <van-tab title="待付款">
            <div class="empty">
                <img src="../assets/images/empty.png">
                <p>暂无数据</p>
            </div>
        </van-tab>
        <van-tab title="待收货">
             <div class="empty">
                <img src="../assets/images/empty.png">
                <p>暂无数据</p>
            </div>
        </van-tab>
        <van-tab title="待评价">
             <div class="empty">
                <img src="../assets/images/empty.png">
                <p>暂无数据</p>
            </div>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active: 0
        }
    },
    methods:{
        removeOrder(index){
            this.$dialog.confirm({
                title: '提示',
                message: '确认删除此订单吗？'
            }).then(_=>{
                this.$store.commit('removeOrder', index)
            }).catch(_=>{})
        }
    }
}
</script>

<style lang="less" scoped>
    .empty{
        min-height: 200px;
        text-align: center;
        margin-top: 150px;
        p{
            color: #ccc;
            font-size: 25px;
        }
    }
    .orderContainer{
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
        .van-panel__header{
            line-height: 56px;
            padding-top: 0;
            padding-bottom: 0;
            color: #666;
            .van-cell__title{
                font-size: 15px;
            }
            i{
                line-height: 56px;
                font-size: 18px;
            }
        }
        .van-panel__header-value{
            color: #00acff;
        }
        .goods_content{
            .van-card{
                background: #fff;
                padding-top: 12px;
                padding-bottom: 12px;
            }
            .van-card__content{
                flex-direction: row;
                justify-content: space-between;
                .goods_tit{
                    color: #333;
                    width: 80%;
                    h3{
                        font-size: 18px;
                        font-weight: 400;
                    }
                    span{
                        font-size: 17px;
                        color: red;
                        line-height: 30px;
                    }
                }
                .van-card__bottom{
                    width: 25%;
                    .goods_num{
                         font-size: 18px;
                    }
                }
            }
        }
        .goods_footer{
            .van-row{
                line-height: 30px;
                font-size: 14px;
                color: #666;
                text-align: center;
                span{
                    color: red;
                    margin: 0 2px;
                    &.total{
                        margin-left: 5px;
                    }
                }
                button{
                    width: 115px;
                    margin: 12px 5px 5px;
                    span{
                        color: #232323;
                    }
                }
            }
        }
    }
</style>