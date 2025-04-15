<template>
  <template v-for="item in menuRoutes" :key="item.path">
    <el-menu-item v-if="item.meta.isShow && ((item.children && item.meta.hiddenChildren) || !item.children)" :index="item.meta.hiddenChildren?item.meta.childrenPath:item.path" @click="goRoute">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        {{item.meta.title}}
      </template>
    </el-menu-item>
    <el-sub-menu v-if="item.children && item.meta.isShow && !item.meta.hiddenChildren" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <Menu :menuRoutes="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
defineOptions({name: 'Menu'})
//引入路由
import {useRouter} from "vue-router";
const $route = useRouter()
defineProps(['menuRoutes'])
//路由跳转
const goRoute = (item:any) => {
  $route.push(item.index)
}
</script>



<style scoped lang="scss">
//添加可展开菜单展开后的样式
.is-opened>::v-deep.el-sub-menu__title{
  background-color: $hover-color;
  color: $base-color;
}
//添加菜单hover之后的样式
.el-menu-item,.el-sub-menu,.el-sub-menu>::v-deep.el-sub-menu__title{
  border-radius: 10px;
}
</style>
