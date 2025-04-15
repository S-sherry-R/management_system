<template>
  <div class="content">
    <img src="../../assets/images/404.png">
    <el-button type="primary" @click="backHome">返回首页</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const $router = useRouter()
const backHome = () =>{
  $router.replace('/')
}
</script>


<style scoped lang="scss">
.content{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
