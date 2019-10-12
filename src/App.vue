<template>
  <div id="app">
    
    <div class="mainContainer">
       <transition name="slider">
        <router-view></router-view>
      </transition>
    </div>
    <van-tabbar v-model="active" class="footBar" v-if="show" >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" info="5" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/news">新闻</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/about">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return {
      active: 0,
      path:['/home', '/classify', '/news', '/about']
    }
  },
  computed:{
    show(){
      let index = this.path.indexOf(this.$route.path)
      if(index !== -1){
        this.active = index;
        return true;
      }
    }
  }
};
</script>

<style lang="less">
  .mainContainer{
    overflow-x: hidden;
  }
  .slider-enter{
    transform: translateX(100%);
  }
  .slider-leave-to{
    transform: translateX(-100%);
    width: 100%;
    position: absolute;
  }

  .slider-enter-active,.slider-leave-active{
     transition: all .3s ease;
  }

  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .van-nav-bar__title{
    font-size: 19px !important;
  }
  .footBar{
    .van-icon{
      font-size: 24px;
    }
  }
.main{
    // min-height: 100vh;
    padding-top: 46px;
    background: #fff;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .f_20{
    font-size: 20px;
  }
  #app,.max_widht{
    max-width: 414px;
    margin: 0 auto;
  }
  .max_widht{
    left: 50%;
    transform: translateX(-50%);
  }
</style>