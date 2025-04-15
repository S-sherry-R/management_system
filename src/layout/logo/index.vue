<template>
  <div class="logo" v-show="setting.showLogo">
    <img :src="setting.logoPath">
    <span v-if="!useSettingStore.isCollapse">{{setting.title}}</span>
  </div>
</template>
<script setup lang="ts">
defineOptions({name: 'logo'})
//引入logo相关配置
import setting from "@/setting.ts";
//引入设置仓库
import useLayoutSettingStore from "@/store/modules/setting.ts";
//菜单是否展开仓库,展开菜单隐藏标题
let useSettingStore = useLayoutSettingStore()
</script>

<style scoped lang="scss">
.logo{
  width: 100%;
  height: 50px;
  padding-top:20px;
  display: flex;
  align-items: center;
  img{
    height: 30px;
    margin-left: 25px;
  }
  span{
    color: $first-color;
    font-size: 20px;
    font-weight: bolder;
    margin-left: 10px;
    white-space: nowrap;
  }
}
</style>
