<template>
  <div class="aboutMeContainer">
    <van-nav-bar :z-index="999" title="关于我们" 
    :style="{'height': '59px'}" 
    left-arrow fixed  @click-left="$router.back()" />

    <van-row
        type="flex"
        justify="center"
        align="center"
        class="about_me"
    >
    <p>包武<small>Visionwuwu</small></p>
    <span>Web前端开发工程师</span>
    </van-row>

    <van-cell-group class="about_link">
        <template slot="title">
            <blockquote>
                <p>关于包武</p>
            </blockquote>
        </template>
        <div class="describe">
            ID：包武
            <br/>
            武，wu，止戈为武，退一步海阔天空。
            <br/>
            目前是一名大三离校生，坐标南昌，欢迎技术交流！
            <br/>
        </div>
    </van-cell-group>

    <van-cell-group class="about_link">
         <template slot="title">
            <blockquote>
                <p>关于本人博客</p>
            </blockquote>
        </template>
         <div class="describe">
            本人博客正在构建中...
            <br/>
            本人还是一个Web前端开发的萌新，欢迎各路大佬指导，一起进步一起分享！
            <br/>
        </div>
    </van-cell-group>

    <van-cell-group class="about_link">
         <template slot="title">
            <blockquote>
                <p>关于这个项目</p>
            </blockquote>
        </template>
         <div class="describe">
            这是我的学习项目，做的还不够好。
            <br/>
            主要是以vant框架，和Vue.js搭建的。
            <br/>
        </div>
    </van-cell-group>

    <div class="footer">
        <p>©2019 - 2020 By 包武</p>
        <p>驱动 vant | 主题 Myfwk</p>
        <p>梦里不知身是客，一晌贪欢。</p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {}
    }
}
</script>

<style lang="less" scoped>
    .aboutMeContainer{
        min-height: 100vh;
        padding-top: 59px;
        background: #fff;
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
        .about_me{
            height: 250px;
            margin-bottom: 25px;
            width: 100%;
            background: url(../assets/images/nw.jpg) no-repeat;
            background-size: 100% 100%;
            background-position: center;
            flex-direction: column;
            color: #fff;
            font-weight: 700;
            span{
                margin-top: 10px;
                font-size: 16px;
            }
            p{
                font-size: 26px;
                small{
                    font-size: 16px;
                    font-weight: normal;
                    margin-left: 10px;
                }
            }
        }
        .van-cell-group__title{
            padding: 0 15px;
            blockquote{
                background-color: #e9f5fe;
                border-left: 3px solid#49b1f5;
                p{
                    font-size: 15px;
                    line-height: 28px;
                    height: 60px;
                    line-height: 60px;
                    padding-left: 16px;
                    color: #6a737d;
                }
            }
        }
        .about_link {
            .describe{
                padding: 10px 16px;
                line-height: 28px;
                color: #4c4948;
            }
        }
        .footer{
            text-align: center;
            background: #49b1f5;
            color: #eee;
            font-size: 14px;
            padding: 10px 20px;
            p{
                line-height: 24px;
            }
        }
    }
</style>