<template>
  <div class="loginContainer">
    <!-- header -->
    <van-nav-bar :z-index="999" title="登录" 
     :style="{'height': '59px'}" 
     left-arrow fixed  @click-left="$router.back()">
        <van-icon name="friends-o" slot="right" size="25px" />
    </van-nav-bar>
        <div class="login_box">
            <van-cell-group>
                <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('question')"
                />
                <van-field
                    v-model="password"
                    :type="pswType"
                    label="密码"
                    placeholder="请输入密码"
                    :right-icon="eyesIcon"
                    @click-right-icon="togglePsw"
                    required
                />
            </van-cell-group>
            <van-button type="primary" size="primary" block :style="{'margin': '30px 0'}">确认登录</van-button>
            <van-divider>或用其他账号登录</van-divider>
            <van-grid :column-num="2" :border="false" :style="{'margin': '30px 0'}" class="login_style">
                <van-grid-item>
                    <van-icon name="alipay" :style="{'color': '#1bcefa', 'fontSize': '45px'}"></van-icon>
                    <p>支付宝</p>
                </van-grid-item>
                 <van-grid-item>
                    <van-icon name="discount" :style="{'color': '#15c434', 'fontSize': '45px'}"></van-icon>
                    <p>账户号</p>
                </van-grid-item>
            </van-grid>
            <van-divider />
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            eyesIcon:'closed-eye',
            pswType: 'password',
            username: '',
            password: ''
        }
    },
    methods:{
        togglePsw(){
            if(this.eyesIcon == 'closed-eye'){
                this.eyesIcon = 'eye-o'
                this.pswType = 'text'
            }else{
                this.eyesIcon = 'closed-eye'
                this.pswType = 'password'
            }
        }
    }
}
</script>

<style lang='less' scoped>
    .loginContainer{
        padding-top: 59px;
        padding-bottom: 50px;
        background: #fff;
        box-sizing: border-box;
        min-height: 100vh;
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
    .login_box{
        padding: 25px 25px;
        
        .login_style{
            p{
               color: #7d7e80;
                font-size: 12px;
                padding: 8px 0;
            }
        }
    }
</style>