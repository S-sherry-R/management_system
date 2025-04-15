<script setup lang="ts">
</script>

<template>
  <div class="titleOutline">
    <span class="title"><slot></slot></span>
    <slot name="other"></slot>
  </div>
</template>

<style scoped lang="scss">
.titleOutline{
  width: 100%;
  .title{
    height: 38px;
    line-height: 38px;
    padding: 0 30px 0 10px;
    border-left: 6px solid $base-color;
    border-bottom: 2px solid $base-color;
    font-weight: 600;
  }
}
</style>
