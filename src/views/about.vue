<template>
<div class="about">
  <!-- header -->
  <van-nav-bar 
  :z-index="999" 
  title="个人中心" 
  :style="{'height': '59px'}"
  left-arrow fixed  
  @click-right="$router.push('/login')"
  @click-left="$router.back()">
    <van-icon name="volume-o" slot="right" size="25px"/>
  </van-nav-bar>

  <van-row class="avatarbox" type="flex" align="center" justify="center" :style="{'flex-direction': 'column'}">
      <van-image
        round
        width="6.5rem"
        height="6.5rem"
        :src="avator"
        />
        <h3>Visionwuwu</h3>
        <p>用努力证明自己</p>
  </van-row>

    <van-grid :column-num="3" :border="false" :style="{'padding-bottom': '5px'}">
        <van-grid-item>
            <p>0</p>
            <p>优惠券</p>
        </van-grid-item>
         <van-grid-item>
            <p>0</p>
            <p>换鼓励金</p>
        </van-grid-item>
         <van-grid-item>
            <p>{{ getIntegral }}</p>
            <p>积分</p>
        </van-grid-item>
    </van-grid>

  <van-cell-group class="cellbox">
    <van-cell title="我的订单" value="全部" value-class="red" to="/order"/>
  </van-cell-group>

  <van-grid :border="false" class="nav_grid" :gutter="20" :style="{'background-color': '#fff', 'margin-bottom': '5px'}">
    <van-grid-item icon="gem-o" text="待付款" to="/order" />
    <van-grid-item icon="point-gift-o" text="待收货" to="/order"/>
    <van-grid-item icon="send-gift-o" text="待评价" to="/order" />
    <van-grid-item icon="balance-o" text="退货/退款" to="/order" />
  </van-grid>
    
    <van-cell-group class="nav_link">
        <van-cell 
         v-for="item in listnav"
        :key="item.id" 
        :title="item.title" 
        is-link 
        :icon="item.icon"
        :to="item.path"
        @click="handleCodeShow(item.id)"
        />
    </van-cell-group>

    <!-- 扫码对话框 -->
    <van-dialog
    v-model="show"
    title="扫码分享"
    confirmButtonText="残忍拒绝"
    :style="{'text-align': 'center'}"
    >
    <img :src="codeSrc" style="margin: 15px 0;">
    </van-dialog>

</div>
</template>

<script>
export default {
    data(){
        return {
            codeSrc: require('../assets/images/mywebsite.png'),
            show: false,
            avator: require('../assets/images/avator.jpg'),
            listnav:[
                {
                    id: 1,
                    icon: 'star-o',
                    title: '我的收藏',
                    path: '/myCollection'
                },
                {
                    id: 2,
                    icon: 'gold-coin-o',
                    title: '我的收货地址',
                    path:'/address'
                },
                 {
                    id: 3,
                    icon: 'info-o',
                    title: '我的购物车',
                    path: '/myCart'
                },
                 {
                    id: 4,
                    icon: 'music-o',
                    title: '扫码分享'
                },
                 {
                    id: 5,
                    icon: 'shop-o',
                    title: '关于我们',
                }
            ]
        }
    },
    methods:{
        handleCodeShow(id){
            if(id == 4){
                this.show = true
            }else if(id == 5){
                this.$router.push('/aboutme');
            }
        }
    },
    computed:{
        getIntegral(){
            let totalScore = 0;
            this.$store.getters.getAllOrders.forEach(item=>{
                totalScore += parseInt(item.count) * item.nowPrice
            });
            return totalScore;
        }
    }
}
</script>

<style scoped lang="less">
    .about{
        padding-top: 59px;
        padding-bottom: 50px;
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
        .van-cell{
            font-size: 15px;
        }
        .van-grid{
            font-size: 15px;
        }
    }
    .avatarbox{
        width: 414px;
        height: 200px;
        background: url(../assets/images/bj.png) no-repeat 100%;
        background-position: center;
        color: #fff;
        h3{
            font-size: 18px;
            font-weight: 500;
        }
    }
    .van-dialog__content{
        padding: 15px 0;
        text-align: center;
        img{
            display: inline-block;
        }
    }
    .red{
        color: red;
    }
    .nav_grid{
        padding: 10px 0;
        color: #179dfe;
    }
    .nav_link{
        .van-cell__left-icon{
            font-size: 21px;
        }
    }
</style>