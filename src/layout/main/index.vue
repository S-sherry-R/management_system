<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <component :is="Component" v-if="flag"></component>
      </div>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
defineOptions({name: 'Main'})
import { watch,ref,nextTick } from "vue"
//引入设置仓库
import useLayoutSettingStore from "@/store/modules/setting.ts";

let useSettingStore = useLayoutSettingStore()
//是否销毁组件
let flag = ref(true)
//监听刷新
watch(() => useSettingStore.refresh, () => {
  flag.value = false
  nextTick(()=>{
    flag.value = true
  })
})
</script>

<style scoped lang="scss">
//过渡动画
.fade-enter-form{
  opacity: 0;
  transform: scale(0);
  background-color: red;
}
.fade-enter-active{
  transition: all .5s;
}
.fade-enter-to{
  opacity: 1;
  transform: scale(1);
}
</style>
