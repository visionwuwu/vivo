<template>
  <div class="addressContainer">
    <!-- header -->
    <van-nav-bar :z-index="999" title="管理收货地址" 
    :style="{'height': '59px'}" 
    left-arrow fixed  
    @click-left="$router.back()">   
    </van-nav-bar>

    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="handlerEdit"
        @select="handlerSelect"
        add-button-text="添加收货地址"
        v-if="list.length"
    >
    </van-address-list>
    <div v-else class="box">
        <div class="not_address"></div>
        <p>
            暂无收货地址 
            <van-button 
            size="small"
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            to="/add_Address"
            >添加收货地址</van-button>
            </p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            chosenAddressId: this.$store.getters.getDefaultId,
            id: this.$route.query.id,
            value: this.$route.query.value,
            list: [] // 收货地址列表
        }
    },
    created(){
        this.getAddress()
    },
    methods:{
        onAdd(){
            this.$router.push('/add_Address')
        },

        getAddress(){
            this.list = this.$store.getters.getAllAddress;
        },

        handlerEdit(item, index){
            this.$router.push('/editAddress/' + item.id);
        },

        handlerSelect(item, index){
            if(this.id && this.value){
                this.$router.push({
                    path: 'pay',
                    query: {
                        id: this.id,
                        value: this.value,
                        selected: item.id
                    }
                });
            }
        }
    }

    
}
</script>

<style lang="less" scoped>
    .van-icon-edit{
        font-size: 23px !important;
    }
    .addressContainer{
        padding-top: 59px;
        padding-bottom: 50px;
        min-height: 100vh;
        box-sizing: border-box;
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
        .not_address{
            background: url(../assets/images/no_address.png) no-repeat;
            background-position: center;
            height: 300px;
            margin-top: 130px;
        }
        .box{
            position: relative;
            text-align: center;
            p{
                position: absolute;
                width: 100%;
                bottom: 30px;
                font-size: 20px;
            }
        }
    }
</style>