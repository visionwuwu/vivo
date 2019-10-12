<template>
  <div class="chooseContainer">
       <!-- header -->
        <van-nav-bar :z-index="999" title="选购手机" 
        :style="{'height': '59px'}" 
        left-arrow fixed  @click-left="$router.back()">
        </van-nav-bar>
       <van-tabs 
       v-model="active" 
       @click="getChooseGoods(ids[active])" 
       color="#43bffe" line-width="25%"
       line-height="2px"
       title-active-color="#43bffe"
       animated
       >
            <van-tab 
            :title="item.name" 
            v-for="item in chooseCate" 
            :key="item.id"
            >
                <van-row class="sort" :border="false">
                    <van-col span="8">价格升序</van-col>
                    <van-col span="8">价格降序</van-col>
                    <van-col span="8">销量优先</van-col>
                </van-row>
                <van-grid :column-num="2" class="productlist">
                    <van-grid-item
                        v-for="val in catetoryList"
                        :key="val.id"
                        :to="'/goodsdetails/' + val.id"
                    >
                        <van-image fit="cover" :src="val.img_src" width="120px" height="120px"></van-image>
                        <p class="detaile">{{ val.goods_details }}</p>
                        <p class="price">
                            <em class="nowPrice">
                                <span>&yen;</span>
                                {{ val.nowPrice }}
                            </em>
                            <em class="oldPrice">
                                <span>&yen;</span>
                                 {{ val.oldPrice }}
                            </em>
                        </p>
                    </van-grid-item>
                </van-grid>
            </van-tab>
        </van-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active: 0,
            ids: [],
            chooseCate:[],
            catetoryList: []
        }
    },
    created(){
        this.getChooseCate()
        this.getChooseGoods(0)
    },
    methods:{
        getChooseCate(){
            this.$axios.get('/api/getChooseCate').then(res=>{
                if(res.status == 200){
                    this.chooseCate = [{id: 0, name: '全部'}].concat(res.data.chooseCate);
                    this.chooseCate.forEach(item=>{
                        this.ids.push(item.id);
                    })
                }else{
                    this.$toast('cate success')
                }
            })
        },
        getChooseGoods(id){
            this.$axios.get('/api/getChooseGoods/' + id).then(res=>{
                if(res.status == 200){
                    this.catetoryList = res.data;
                }
                else{
                    this.$toast('choosegoods failed')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .chooseContainer{
        padding-top: 59px;
        background: #fff;
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
    }
    .productlist{
      .detaile{
            padding: 8px;
            color: #333;
            font-size: 13px;
      }
      .price{
        em{
            font-style: normal;
            font-size: 14px;
        }
        span{
            font-size: 18px;
            margin-right: 5px;
        }
        .nowPrice{
            color: #f40;
            margin-right: 15px;
        }
        .oldPrice{
            color: #c5c8ce;
            text-decoration: line-through;
        }
      }
    }
    .sort{
        text-align: center;
        background: #f4f4f4;
        color: #333;
        padding: 10px 0;
    }
</style>