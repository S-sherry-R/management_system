<template>
  <svg :style="{height,width}">
    <use :xlink:href="prefix+name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //图标的名字
  name: String,
  //图标的颜色
  color: {
    type: String,
    default: ''
  },
  //图片的宽度
  width: {
    type: String,
    default: '16px'
  },
  //图片的高度
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped>

</style>
