<template>
  <div class="addAddressContainer">

    <!-- header -->
    <van-nav-bar :z-index="999" title="新增地址" 
    :style="{'height': '59px'}" 
    left-arrow fixed  @click-left="$router.back()">
    </van-nav-bar>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      @save="onSave"
    />
  </div>
</template>

<script>
import area from '../mockjs/area.js';
export default {
    data(){
        return {
          areaList: area,
        }
    },
    methods: {
      onSave(val) {
        this.$store.commit('addAddress', val);
        this.$router.push('/address');
      },
    }
}
</script>

<style lang="less" scoped>
  .addAddressContainer{
    padding-top: 59px;
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
  }
</style>