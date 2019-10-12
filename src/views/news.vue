<template>
  <div class="newsContainer">
    <!-- header -->
  <van-nav-bar :z-index="999" title="资讯动态" 
  :style="{'height': '59px'}"
  left-arrow fixed  @click-left="$router.back()">
    <van-icon name="vip-card-o" slot="right" size="25px"/>
  </van-nav-bar>

    <div class="panel" v-for="item in newslist" :key="item.id">
      <router-link :to="'/newsDetails/' + item.id">
        <h3 class="panel_tit">{{ item.title }}</h3>
        <div class="panel_body">
          <van-image 
          lazy-load
          width="100%"
          height="100%"
          :src="item.img_src"
          />
          <div class="news_info">
            {{ item.info }}
          </div>
          <p class="public_time">发布日期 {{ item.public_time }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      newslist: [], // 新闻资讯列表
    }
  },
  created(){
    this.getNews()
  },
  methods:{
    getNews(){
      this.$axios.get('/api/getnews').then(res=>{
        if(res.status == 200){
          this.newslist = res.data.news;
        }else{
          this.$toast('get news failed')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .newsContainer{
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
        .van-nav-bar__right{
          bottom: 8px;
          i{
          color: #333;
          }
        }
    .panel{
      padding: 5px 12px;
      min-height: 340px;
      border-bottom: 1px dotted #ccc;
      .panel_tit{
        color: #505b63;
        font-size: 21px;
        font-weight: 400;
        padding: 20px 0;
      }
      .news_info{
        color: #696969;
        font-size: 12px;
        line-height: 21px;
        padding-top: 13px;
      }
      .public_time{
        color: #696969;
        font-size: 12px;
        padding-top: 8px;
      }
    }
  }
</style>