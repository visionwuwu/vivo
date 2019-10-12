<template>
  <div class="editAddressContainer">
       <van-nav-bar :z-index="999" title="编辑地址" left-text="返回" left-arrow fixed  @click-left="$router.back()">
    </van-nav-bar>
      <van-address-edit
        :addressInfo="cAddress"
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
        />
  </div>
</template>

<script>
import area from '../mockjs/area.js';
export default {
    data(){
        return {
            areaList: area,
            id: this.$route.params.id,
            cAddress: {},
        }
    },
    created(){
        this.getEditAddress();
    },
    methods:{
        onSave(val) {
            this.$store.commit('editAddress', val);
            this.$router.go(-1);
        },
        onDelete() {
        },
        getEditAddress(){
            let All = this.$store.getters.getAllEditAddress;
            let obj = All.find(item=>{
                return item.id === parseInt(this.id)
            });
            if(this.$store.getters.getDefaultId != obj.id) obj.isDefault = false;
            this.cAddress = obj;
        }
    }
     
}
</script>

<style lang="less" scoped>
    .editAddressContainer{
        padding-top: 46px;
    }
</style>