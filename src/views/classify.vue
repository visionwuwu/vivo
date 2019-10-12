<template>
<div class="classifyContainer">
  <!-- header -->
  <van-nav-bar :z-index="999" title="商品分类" 
  :style="{'height': '59px'}" 
  left-arrow fixed  @click-left="$router.back()">
    <van-icon name="award-o" slot="right" size="25px"/>
  </van-nav-bar>

  <div class="catetoryContainer">
    <!-- 右边 -->
      <van-sidebar v-model="activeKey" class="slidebarbox">
      <van-sidebar-item 
      v-for="item in slidebarlist"
      :key="item.id"
      :title="item.name"
      @click="handleGetSecondCate(item.id)"
      />
    </van-sidebar>

    <!-- 左边 -->
    <div class="rightContainer">
      <van-grid 
      :gutter="15"
      :column-num="3"
      >
        <van-grid-item
          v-for="item in productlist"
          :key="item.id"
          :text="item.goods_details"
          :to="'/goodsdetails/' + item.id"
        >
        <van-image :src="item.img_src" fit="cover"/>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      activeKey: 0,
      slidebarlist:[], // 一级分类数据
      productlist:[] // 二级分类数据
    }
  },
  created(){
    this.getFirstCateData()
    this.handleGetSecondCate(0);
  },
  methods:{
    getFirstCateData(){
      this.$axios.get('/api/getFirstCate').then(res=>{
        if(res.status == 200){
          this.slidebarlist = [{id: 0, name: '全部分类'}].concat(res.data.firstCate)
        }else{
          this.$toast('fitst get failed')
        }
      })
    },

    handleGetSecondCate(id){
      this.$axios.get('/api/getSecondCate/' + id).then(res=>{
        if(res.status == 200){
          this.productlist = res.data;
        }else{
          this.$toast('get second failed')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .classifyContainer{
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
    .catetoryContainer{
      display: flex;
      min-height: 100vh;
      padding-top: 59px;
      background: #fff;
      padding-bottom: 50px;
      box-sizing: border-box;
      .slidebarbox{
        text-align: center;
        font-size: 14px;
        .van-sidebar-item--select{
          border-color: #43bffe;
          border-width: 2px;
          color: #43bffe;
          background: #fff;
        }
      }
      .rightContainer{
        padding-top: 10px;
        flex: 1;
      }
    }
  }
</style>