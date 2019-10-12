<template>
  <div class="newsDetailsContainer">
    <!-- header -->
    <van-nav-bar :z-index="999" title="资讯详情" 
    :style="{'height': '59px'}"
    left-arrow fixed  @click-left="$router.back()">
    </van-nav-bar>

    <div class="detali_con" v-for="item in newsDetailsList" :key="item.img_src">
        <van-image
        width="100%"
        height="100%"
        lazy-load
        :src="item.img_src"
        />
        <p>{{ item.info }}</p>
    </div>
    <div class="suggest">
        <van-button plain type="info" icon="good-job-o" round @click="handleLike">
            点赞<span class="link_num">{{ likenum }}</span>
            </van-button>
        <van-button plain type="info" icon="like-o" round @click="collectionArticle">收藏</van-button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            newsDetailsList: [],
            cArticle: {},
            likenum: 0
        }
    },
    created(){
        this.getNewsList()
        this.getArticle()
        this.likenum = this.$store.state.likeNum[this.id] || 0;
    },
    methods:{
        getNewsList(){
            this.$axios.get('/api/getnewsDetail/' + this.id).then(res=>{
                if(res.status == 200){
                    let {img_src, info} = res.data
                    this.newsDetailsList.push({'img_src': img_src[0], info});
                    this.newsDetailsList.push({'img_src': img_src[1], info});
                }
            })
        },

        getArticle(){
            this.$axios.get('/api/getnews').then(res=>{
                if(res.status == 200){
                    this.cArticle = res.data.news.find(item=>{
                        return item.id == this.id;
                    })
                }else{
                    this.$toast('获取文章失败')
                }
            })
        },

        collectionArticle(){
            this.$store.commit('addArticle', this.cArticle);
        },

        handleLike(){
            this.$store.commit('clickLike', this.id);
            this.likenum = this.$store.state.likeNum[this.id];
            this.$toast({
                message: '点赞成功',
                duration: 500
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .newsDetailsContainer{
        padding-top: 59px;
        background: #fff;
        padding-bottom: 15px;
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
        .detali_con{
            padding: 0 20px;
            img{
                display: block;
            }
            p{
                color: #333;
                font-size: 15px;
                line-height: 24px;
                margin-bottom: 10px;
                margin-top: 10px;
            }
        }
        .suggest{
            text-align: center;
            line-height: 84px;
            button{
                margin: 0 10px;
                padding-right: 35px;
                padding-left: 35px;
                position: relative;
                .link_num{
                    position: absolute;
                    margin-left: 3px;
                    color: #fff;
                    background: linear-gradient(to right, #ffd01e, #ff8917);
                    min-width: 16px;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 14px;
                    text-align: center;
                    border-radius: 16px;
                    right: 22px;
                    top: 6px;
                }
            }
        }
    }
</style>