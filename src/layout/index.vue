<template>
  <el-container class="common-layout">
<!--    左侧菜单-->
    <el-aside width="240px" class="layout-aside" :class="useSettingStore.isCollapse ? 'collapse' : ''">
      <logo></logo>
      <el-menu
          class="layout-menu el-menu-vertical-demo"
          :default-active="$route.path"
          :collapse="useSettingStore.isCollapse"
      >
        <Menu :menuRoutes="menuRoutes"></Menu>
      </el-menu>
    </el-aside>
    <el-container>
<!--      顶部导航-->
      <el-header height="80px" class="layout-header" :class="useSettingStore.isCollapse ? 'collapse' : ''">
        <Tarbar/>
      </el-header>
<!--      内容展示区-->
      <el-main class="layout-main" :class="useSettingStore.isCollapse ? 'collapse' : ''">
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
//引入logo组件
import Logo from './logo/index.vue'
//引入menu组件
import Menu from './menu/index.vue'
//引入带有过渡动画的路由组件
import Main from './main/index.vue'
//引入顶部
import Tarbar from './tabbar/index.vue'
//引入相关仓库
import useUserStore from "@/store/modules/user.ts";
//引入路由
import { useRoute } from "vue-router";
//引入设置仓库
import useLayoutSettingStore from "@/store/modules/setting.ts";


//菜单路由list
let menuRoutes = useUserStore().userState.menuRoutes
let $route = useRoute()
//菜单是否展开仓库
let useSettingStore = useLayoutSettingStore()
</script>

<style scoped lang="scss">
.common-layout{
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  .layout-aside{
    background-color: #fff;
    transition: all .3s;
    &.collapse{
      width: $menu-collapse-width;
    }
    .layout-menu{
      width:100%;
      height: calc(100vh - 65px);
      overflow: auto;
      padding: 0 10px;
      margin-top: 15px;
      border: none
    }
  }
  .layout-header{
    background-color: #fff;
    border:1px solid $line-color;
    border-top: none;
    box-shadow: 0 5px 10px -5px #ccc;
    transition: all .3s;
    &.collapse{
      width: calc(100vw - $menu-collapse-width);
    }
  }
  .layout-main{
    transition: all .3s;
    &.collapse{
      width: calc(100vw - $menu-collapse-width);
    }
  }
}
</style>
