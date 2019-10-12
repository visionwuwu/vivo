<template>
  <div class="myCartContainer">
       <!-- header -->
    <van-nav-bar :z-index="999" title="购物车" 
    :style="{'height': '59px'}" 
    left-arrow fixed  @click-left="$router.back()">
    </van-nav-bar>
      <ul class="goodslist">
        <div class="empty_cart" v-if="goodslist.length == 0">
            <img src="../assets/images/gouwuche.png">
            <h2>购物车是空的哦，快去购物吧</h2>
            <router-link to="/home" class="goshop">逛一逛</router-link>
        </div>
    
        <li v-else v-for="item in goodslist" :key="item.id">
            <van-checkbox-group v-model="$store.state.checkedIds">
                <van-checkbox 
                    checked-color="#4db5fe"
                    icon-size="23px"
                    :name="item.id"
                    @click="handleSelected(item.id)"
                />
            </van-checkbox-group>
            
            <van-image
                :src="item.img_src"
                width="100px"
                height="100px"
            />
            <div class="info">
                <p>
                    {{ item.count }}
                    <span class="tit">{{ item.goods_details }}</span>
                    <van-icon name="delete" size="22px" @click="removeItem(item.id)"/>
                </p>
                <span class="sell_price">&yen; &nbsp;{{ item.nowPrice }}</span>
                <van-stepper :integer="true" 
                v-model="$store.getters.getCartGoodsCount['count' + item.id]"
                :max="$store.getters.getCartGoodsCount['max' + item.id]"
                input-width="42px" button-size="32px" 
                @change="handleUpdateCount($event, item.id)"
                />
            </div>
        </li>
      </ul>
         <!-- 底部结算区 -->
        <div class="footbar">
            <van-checkbox 
            :value="isSelectedAll"
            checked-color="#4db5fe"
            icon-size="23px"
            @click="selectAll"
            ref="toggle"
            >
            全选
            </van-checkbox>
            <em>合计：<span>&yen;&nbsp;{{ $store.getters.getComputedTotal.totalMoney.toFixed(2) }}</span>
            </em>
            <router-link class="pay_btn" to="/pay?type=cart">结算 &nbsp;{{ $store.getters.getComputedTotal.count }}</router-link>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            checked: false,
            value: 1,
            goodslist: [],
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        removeItem(id){
            this.$dialog.confirm({
                title: '提示',
                message: '确认删除该商品吗？',
                closeOnClickOverlay: true
            }).then(_=>{
                this.$store.commit('removeOneGoods', id);
                this.getGoodsList()
            }).catch(_=>{})
        },
        getGoodsList(){
            let ids = []
            this.$store.state.cart.forEach(item=> ids.push(item.id)); // 获取购物车中的所有商品的id
            // 获取所有的商品
            this.$axios.get('/api/getAllGoods').then(res=>{
                if(res.status == 200){
                    this.goodslist = res.data.filter(item=>{
                        return ids.includes(item.id)
                    });
                }else{
                    this.$toast('获取商品失败')
                }
            })
        },
        handleSelected(id){
            this.$store.commit('saveSelected', id)
        },
        selectAll(){
            let ids = [];
            let flag = this.$refs.toggle.checked;
            flag = this.checked = !flag;
            flag && this.$store.state.cart.forEach(item=>{
                ids.push(item.id)
            })
            this.$store.commit('saveSelected', ids)
        },
        handleUpdateCount(val, id){
            this.$store.commit('updateCartGoods', {val, id})
        }
    },
    computed:{
        isSelectedAll(){
            let state = this.$store.state;
            return state.checkedIds.length == state.cart.length;
        }
    }
}
</script>

<style lang="less" scoped>
    .myCartContainer{
        padding-top: 59px;
        padding-bottom: 51px;
        background: #f4f4f4;
        min-height: 100vh;
        box-sizing: border-box;
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
        .goodslist{
            li{
                display: flex;
                align-items: center;
                padding-left: 20px;
                padding-right: 15px;
                height: 130px;
                background: #fff;
                border-bottom: 1px dotted #ccc;
                .van-image{
                    margin: 0 18px;
                }
                .info{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p{
                        display: flex;
                        justify-content: space-between;
                        .tit{
                            color: #333;
                            font-size: 14px;
                        }
                    }
                    .sell_price{
                        color: red;
                        font-size: 17px;
                        margin: 10px 0;
                    }
                }
            }
        }
        .footbar{
            position: fixed;
            bottom: 0;
            left: 0;
            background: #fff;
            color: #333;
            height: 51px;
            border-top: 1px solid #f4f4f4;
            z-index: 1000;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding-left: 20px;
            padding-right: 12px;
            em{
                font-style: normal;
                span{
                    font-size: 20px;
                    color: red;
                    margin-left: 5px;
                }
            }
            .pay_btn{
                border-radius: 40px;
                width: 36%;
                height: 40px;
                line-height: 40px;
                background: red;
                color: #fff;
                text-align: center;
            }
        }
        .empty_cart{
            text-align: center;
            img{
                width: 182px;
                height: 153px;
                margin-top: 62px;
            }
            h2{
                color: #959595;
                font-size: 25px;
                margin-top: 20px;
            }
            .goshop{
                border-radius: 3px;
                line-height: 37px;
                width: 110px;
                color: #fff;
                background: #e0524b;
                font-size: 20px;
                text-align: center;
                display: inline-block;
                font-weight: 800;
                margin-top: 30px;
            }
        }
    }
</style>