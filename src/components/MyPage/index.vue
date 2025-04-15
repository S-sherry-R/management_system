<template>
  <el-config-provider :locale="zhCn">
    <el-pagination
        style="margin-top:15px"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="total, sizes,->, prev, pager, next, jumper"
        :total="total"
        @size-change="change"
        @current-change="change"
    />
  </el-config-provider>
</template>
<script setup lang="ts">
defineOptions({name: 'myPage'})
import {ref, nextTick} from 'vue'
//国际化
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const emit = defineEmits(['searchTable'])
defineProps({
  //总条数
  total: {
    type: Number,
    default: 0
  }
})
//当前页码
let currentPage = ref<number>(1)
//一页多少条
let pageSize = ref<number>(10)
//pageSize改变的方法,currentPage页码改变的方法
const change = () => {
  nextTick(() => {
    emit('searchTable',currentPage,pageSize)
  })
}
//暴露数据给父组件
defineExpose({ currentPage, pageSize })
</script>

<style scoped lang="scss">

</style>
