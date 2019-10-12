<template>
  <div class="myCollectionContainer">
    <!-- header -->
    <van-nav-bar :z-index="999" title="我的收藏" 
    :style="{'height': '59px'}" 
    left-arrow fixed  @click-left="$router.back()">
    </van-nav-bar>
    <van-tabs 
    v-model="active"
    color="#43bffe"
    title-active-color="#43bffe"
    line-width="15%"
    line-height="2px"
    animated
    >
    <!-- 商品 -->
        <van-tab title="商品">
          <div class="empty" v-if="$store.state.goodsCollection.length == 0">
            <img src="../assets/images/empty.png">
            <p>暂无数据</p>
          </div>

          <ul class="goodslist" v-else>
            <li 
            v-for="item in $store.state.goodsCollection"
            :key="item.id"
            >
              <router-link :to="'/goodsdetails/' + item.id">
                <van-image
                :src="item.img_src"
                width="100px"
                height="100px"
                />
                <div class="info">
                    <p>
                      <span class="tit">{{ item.title }}</span>
                    </p>
                    <p>
                      <span class="sell_price">&yen;{{ item.price }}</span>
                      <van-icon name="delete" size="25px" :style="{'margin-top': '8px'}" @click.prevent="handleRemoveGoodsColl(item.id)"/>
                    </p>
                </div>
              </router-link>
            </li>
      </ul>

      <!-- 文章 -->
        </van-tab>
        <van-tab title="文章">
          <div class="empty" v-if="$store.state.articleCollection.length == 0">
            <img src="../assets/images/empty.png">
            <p>暂无数据</p>
          </div>
          <div 
            class="article" 
            v-for="item in $store.state.articleCollection" 
            :key="item.id"
            v-else
          >
            <router-link :to="'/newsDetails/' + item.id">
              <h3>{{ item.title }}</h3>
              <p>{{ item.info }}</p>
              <p>
                <span>收藏时间：{{ item.time | format}}</span>
                <van-icon name="delete" size="18px" color="#aaa" @click.prevent="handleRemoveArctile(item.id)"></van-icon>
              </p>
            </router-link>
          </div>
        </van-tab>
    </van-tabs>
  </div>
</template>
 
<script>
export default {
    data(){
        return {
            active: 0,
        }
    },
    methods:{
      handleRemoveArctile(id){
        this.$dialog.confirm({
          title: '提示',
          message: '您确认取消收藏该文章吗？'
        }).then(() => {
          this.$store.commit('removeArticle', id);
        }).catch(_=>{})
      },

      handleRemoveGoodsColl(id){
        this.$dialog.confirm({
          title: '提示',
          message: '您确认取消收藏该商品吗？'
        }).then(() => {
          this.$store.commit('removeGoodsCollection', id);
        }).catch(_=>{})
      }
    },
    filters:{
      format(str, pattern=""){
            let d = new Date(str)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let date = d.getDate()
            if(pattern && pattern == 'yyyy-mm-dd'){
                return `${year}-${month}-${date}`
            }else{
                let arr = ['日', '一', '二', '三', '四', '五', '六']
                let week = arr[d.getDay()]
                let hours = d.getHours().toString().padStart(2, 0)
                let minutes = d.getMinutes().toString().padStart(2, 0)
                let seconds = d.getSeconds().toString().padStart(2, 0)
                return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
            }
        }
    }
}
</script>

<style lang="less" scoped>
  .myCollectionContainer{
    min-height: 100vh;
    box-sizing: border-box;
    background: #fff;
    padding-top: 59px;
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
    .empty{
      min-height: 200px;
      text-align: center;
      margin-top: 150px;
      p{
        color: #ccc;
        font-size: 25px;
      }
    }
  }
  .article{
    padding: 20px;
    padding-bottom: 5px;
    display: flex;
    background: #fff;
    min-height: 130px;
    border-bottom: 1px solid #eee;
     >a{
      display: flex;
      flex-direction: column;
      width: 100%;
      color: inherit;
    }
    h3{
      color: #333;
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    p{
      font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 22px;
        &:last-child{
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }
    }
  }

  .goodslist{
      li{
          display: flex;
          padding-left: 20px;
          padding-right: 15px;
          height: 130px;
          >a{
            display: flex;
            align-items: center;
            width: 100%;
            color: inherit;
          }
          .van-image{
              margin: 0 5px;
              margin-right: 10px;
          }
          .info{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              p{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .tit{
                      color: #333;
                      font-size: 15px;
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
</style>