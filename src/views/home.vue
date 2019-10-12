<template>
<div class="vivoHomeContainer">
  <!-- header -->
  <van-nav-bar :z-index="999" title="vivo" fixed :style="{'height': '59px'}">
    <van-icon name="star-o" slot="right" size="25px" />
  </van-nav-bar>

  <!-- logo -->
  <van-row class="logos">
    <van-col span="6"><van-icon name="smile-o" />官方正品</van-col>
    <van-col span="6"><van-icon name="thumb-circle-o" />满68包邮</van-col>
    <van-col span="6"><van-icon name="comment-circle-o" />30天退换货</van-col>
    <van-col span="6"><van-icon name="shop-collect-o" />全国网点售后</van-col>
  </van-row>
  <!-- 轮播图区域 -->
  <van-swipe 
    :autoplay="3000"
    :height="250"
    indicator-color="#aeaeb4"
    class="slider"
    :style="{'over-flow': 'hidden'}"
    >
    <van-swipe-item v-for="item in slidelist" :key="item.id" class="slideitem">
      <img v-lazy="item.img_src" />
    </van-swipe-item>
  </van-swipe>

  <!-- 导航 -->
  <div class="navbar">
    <van-grid :border="false">
      <van-grid-item to="/choose">
        <van-icon name="youzan-shield" :style="{'color': '#53affa'}"></van-icon>
        <p>选购手机</p>
      </van-grid-item>

       <van-grid-item to="/parts">
        <van-icon name="umbrella-circle" :style="{'color': '#77d099'}"></van-icon>
        <p>选购配件</p>
      </van-grid-item>

       <van-grid-item>
        <van-icon name="printer" :style="{'color': '#fe7b57'}"></van-icon>
        <p>选购碎屏保</p>
      </van-grid-item>

      <van-grid-item>
      <van-icon name="invition" :style="{'color': '#5897f4'}"></van-icon>
      <p>定制手机</p>
    </van-grid-item>
    </van-grid>
  </div>

  <!-- 爆款商品 -->
  <van-panel title="爆款商品" class="hot_goods">
    <div>
        <van-image
        lazy-load
        width="100%"
        height="168px"
        src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20180405/20180405101609299910_original.jpg"
      />
    </div>
  </van-panel>

  <!-- 商品列表 -->
  <div class="goodslist">
    <van-row 
    type="flex" 
    justify="space-between"
    v-for="(row, index) in handleGoods"
    :key="index"
    :style="{'padding': '0px 8px'}"
    >
      <van-col span="12" class="goodsitem" v-for="item in row" :key="item.id">
        <router-link :to="'/goodsdetails/' + item.id">
          <div class="goodsitem_content">
          <van-image :src="item.img_src" lazy-load width="110px" height="110px"></van-image>
          <p class="goodsDetail">{{ item.goods_details }}</p>
          <p class="price">
              <em class="nowPrice">
                <span>&yen;</span>
                {{ item.nowPrice }}
              </em>
              <em class="oldPrice">
                <span>&yen;</span>
                {{ item.oldPrice }}
              </em>
          </p>
        </div>
        </router-link>
      </van-col>
    </van-row>
  </div>
</div>
</template>

<script>

export default {
  data(){
    return{
      slidelist: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      goodslist:[]
    }
  },
  created(){
    this.getsliders()
    this.getGoods()
  },
  methods:{
    getsliders(){
      this.$axios.get('/api/getslider').then(res=>{
        if(res.status == 200){
          this.slidelist = res.data.sliders;
        }else{
          this.$toast.fail('获取轮播失败')
        }
      })
    },
    getGoods(){
      this.$axios.get('/api/getgoods').then(res=>{
        if(res.status == 200){
          this.goodslist = res.data.goods;
        }else{
          this.$toast('获取商品数据成功')
        }
      })
    }
  },
  computed:{
    handleGoods(){
      let goods = [];
      let arr = [];
      let len = this.goodslist.length;
      this.goodslist.forEach((item, index)=>{
        arr.push(item);
        if((index + 1) % 2 == 0){
          goods.push(arr);
          arr = [];
        }else if((index == len - 1) && len % 2 !=0 ){
          goods.push(arr)
        }
      });
      return goods;
    }
  }
}
</script>

<style lang="less" scoped>
  .vivoHomeContainer{
     padding-top: 59px;
    background: #fff;
    padding-bottom: 50px;
    .van-nav-bar__title{
      line-height: 59px;
      font-size: 19px;
    }
    .van-nav-bar__right{
      bottom: 8px;
      i{
      color: #333;
      }
    }
    .logos{
      padding: 10px;
      font-size: 12px;
      color: #aaa;
      text-align: center;
      line-height: 15px;
      i{
        font-size: 18px;
        color: #aaa;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    .slider{
      .slideitem{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .navbar{
      border-bottom: 1px solid #eee;
      .van-grid-item__content{
       i{
         font-size: 38px;
       }
       p{
        padding: 5px 0;
         color: #7d7e80;
       }
      }
    }

    .goodslist{
      padding: 15px 0 5px;
      .goodsitem{
        padding: 0 5px;
        min-height: 195px;
        .goodsitem_content{
            padding: 10px 5px; 
            border-radius: 4px;
            box-shadow: 0 0 3px rgba(0,0,0,.3);
            text-align: center;
            img{
              width: 100%;
              height: auto;
            }
        .goodsDetail{
          padding: 5px;
          color: #333;
          font-size: 13px;
          text-align: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .price{
          padding: 5px 0;
          text-align: left;
          em{
            font-style: normal;
            font-size: 14px;
          }
          span{
            font-size: 16px;
            margin-right: 2px;
          }
          .oldPrice{
            color: #c5c8ce;
            text-decoration: line-through;
          }
          .nowPrice{
            color: #f40;
            margin-right: 10px;
          }
        }
        }
        margin-bottom: 10px;
      }
    }
  }
  
</style>