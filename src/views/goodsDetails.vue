<template>
  <div class="goodsDetailContainer">
    <!-- header -->
    <van-nav-bar 
    :z-index="999" title="商品详情" 
    left-arrow fixed
    :style="{'height': '59px'}" 
    @click-left="$router.back()">
    </van-nav-bar>

      <!-- 商品详情轮播 -->
    <van-swipe :autoplay="3000" class="slider" indicator-color="#aaa" :height="328">
        <van-swipe-item v-for="image in sliderimgs" :key="image">
            <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe>
    <div class="info">
        <h2>{{ info.title }}</h2>
        <div class="detaile_info"><span>[{{ info.small }}]</span>
            {{ info.content }}
        </div>
        <p><span>&yen;</span>{{ info.price }}</p>
    </div>
    <div class="inputNum">
        <span>购买数量：</span>
        <van-stepper 
        v-model="value" 
        input-width="55px" 
        button-size="28px" 
        :style="{'display': 'inline-block'}"
        :max="info.max"
        />
         <!-- 小球半场动画 -->
        <transition
            @before-enter="beforEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag"></div>
        </transition>
    </div>
    <van-cell is-link class="drop" @click="popMenu">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <van-icon
                slot="right-icon"
                name="passed"
            />
            <span class="custom-title">支持花呗分期</span>
            <van-icon
                slot="right-icon"
                name="passed"
            />
            <span class="custom-title">支持以旧换新</span>
        </template>
    </van-cell>

    <!-- 弹出框 -->
    <van-popup
        v-model="show"
        closeable
        position="bottom"
        class="my_popup"
    >
        <h3>服务说明</h3>
        <div class="pop_body">
            <div>
                <van-icon name="passed"></van-icon>
                <h4>支持花呗分期</h4>
                <p>商品支持花呗分期</p>
            </div>
            <div>
                <van-icon name="passed"></van-icon>
                <h4>可以使用换新鼓励金</h4>
                <p>换新鼓励金通过参加以旧换新回收旧手机以后获得，旧手机享受额外补贴。
                    <router-link to="/">现在换机</router-link>
                </p>
            </div>
        </div>
        <div class='pop_footer'>
            <van-button round type="info" size="small" :block="true" @click="popMenu">关闭</van-button>
        </div>
    </van-popup>

    <!-- 查看参数 -->
    <van-tabs 
    v-model="active" animated
    line-width="50%"
    color="#26a2ff"
    line-height="2px"
    title-active-color="#26a2ff"
    >
        <van-tab title='图片详情'>
            <van-image
            v-for="item in Images"
            :key="item.img_src"
            width="100%"
            height="auto"
            :src="item.img_src"
            :style="{'display': 'block'}"
            ></van-image>
        </van-tab>
        <van-tab title='参数'>
            <div class="list" v-html="info.params"></div>
        </van-tab>
    </van-tabs>

    <!-- 订单购物 -->
    <van-goods-action :style="{'z-index': '1000'}">
        <van-goods-action-icon icon="shop-collect-o" text="店铺" />
        <van-goods-action-icon 
        icon="star-o" text="收藏" 
        @click="handleGoodsColl" 
        :info="$store.getters.getCollectionCount"/>
        <van-goods-action-icon 
        id="cart"
        icon="shopping-cart-o" text="购物车" 
        to="/myCart" :info="$store.getters.getCartGoodsCount.total"/>
        <van-goods-action-button color="#ff9800" text="加入购物车" 
        :style="{'borderRadius': '0','height': '50px'}"
        @click="handleAddCart"
         />
        <van-goods-action-button 
        :to="'/pay?id=' + id + '&value=' + value" 
        color="#e3211e"  
        text="提交订单" 
        :style="{'borderRadius': '0','height': '50px','margin-right':'0'}"/>
    </van-goods-action>
  </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id, // params id
            sliderimgs: [], // 轮播图
            value: 1, // 数字输入框
            show: false, // dialog
            info: {}, // 商品信息
            ballFlag: false, // 小球是否显示
            active: 0,
            Images: [],
        }
    },
    created(){
        this.getsliders()
        this.getInfo()
    },
    methods:{
        getsliders(){
            this.$axios.get('/api/goods/goodsdetails/' + this.id).then(res=>{
                if(res.status == 200){
                    this.sliderimgs = res.data;
                }else{
                    this.$toast('获取详情轮播图失败')
                }
            })
        },

        getInfo(){
            this.$axios.get('/api/goods/getinfo/' + this.id).then(res=>{
                if(res.status == 200){
                    this.info = res.data;
                    this.Images = res.data.introImgs;
                }else{
                    this.$toast('参数获取失败')
                }
            })
        },

        popMenu(){
            this.show = !this.show;
        },

        handleGoodsColl(){
            let {title, price} = this.info;
            let goods = {
                id: this.id,
                img_src: this.sliderimgs[0],
                title,
                price
            }
            this.$store.commit('addGoodsCollection', goods);
        },

        handleAddCart(){
            this.ballFlag=!this.ballFlag // 控制小球的显示和隐藏

            let goods = {
                id: this.id,
                count: this.value,
                price: this.info.price,
                max: this.info.max,
            };
            this.$store.commit('addCart', goods);
            this.$toast({
                message: '添加成功',
                duration: 1500
            })
        },

        // 小球动画的钩子函数
        beforEnter(el){ // 初始时的状态
            el.style.transform = 'translate(0,0)';
        },
        enter(el, done){ // 设置完成时的状态
            el.offsetWidth;

            let ballrect = el.getBoundingClientRect();
            let badgerect = document.querySelector('#cart .van-info').getBoundingClientRect();
            let xDist = badgerect.left - ballrect.left;
            let yDist = badgerect.top - ballrect.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = 'all .7s ease-in-out';

            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        }
    }
}
</script>

<style lang="less" scoped>
    .goodsDetailContainer{
        padding-top: 59px;
        background: #fff;
        padding-bottom: 50px;
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
    }
    .slider{
        img{
            width: 65%;
            margin: auto;
            display: block;
            height: 280px;
        }
    }
    .info{
        display: flex;
        padding: 15px;
        flex-direction: column;
        h2{
            font-weight: 500;
            font-size: 20px;
            padding: 8px 0;
        }
        .detaile_info{
            font-size: 13px;
            line-height: 21px;
            text-align: justify;
            span{
                color: red;
            }
        }
        p{
            font-size: 27px;
            color: red;
            padding: 8px 0;
            span{
                padding: 5px;
            }
        }
    }
    .inputNum{
        display: flex;
        align-items: center;
        padding: 18px 16px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        position: relative;
        .ball{
            position: absolute;
            width: 17px;
            height: 17px;
            z-index: 1001;
            border-radius: 50%;
            background: #ee0a24;
            left: 136px;
            bottom: 23px;
        }
    }
    .drop{
        i,span{
            vertical-align: middle;
        }
        span{
            color: #777;
            margin-right: 10px;
        }
        .van-cell__title{
            i{
                color: rgb(38, 162, 255);
                margin-right: 5px;
            }
        }
    }
    .my_popup{
        h3{
            color: #333;
            font-size: 20px;
            font-weight: 400;
            text-align: center;
            line-height: 62px;
        }
        .pop_body{
            padding: 20px 32px;
            border-bottom: 1px solid #ccc;
             div{
                 &:last-child{
                     margin-top: 24px;
                    margin-bottom: 30px;
                 }
                i{
                    color: rgb(38, 162, 255);
                    font-size: 20px;
                }
                h4{
                    font-size: 17px;
                    color: #333;
                    font-weight: 400;
                    padding-left: 30px;
                }
                p{
                    color :#666;
                    padding-left: 15px;
                    margin-top: 5px;
                    line-height: 28px;
                    a{
                        color: rgb(38, 162, 255);
                    }
                }
            }
        }
       .pop_footer{
           padding: 0 10px;
           button{
               margin: 12px 0;
               background: rgb(0,172,255);
           }
       }
    }
</style>