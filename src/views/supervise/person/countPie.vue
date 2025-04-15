<script setup lang="ts">
import { ref,watch } from 'vue'
import * as chart from 'echarts'
const emit = defineEmits(['pieClick'])
const props = defineProps({
  pieData: {
    type: Array,
    default: []
  },
  orgName: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    default: 0
  }
})
watch(props,() =>{
  drawerPie()
})
const pie = ref()
//echarts实例
const pieCharts = ref()
const drawerPie = () => {
  if(!pieCharts.value){
    pieCharts.value = chart.init(pie.value)
    pieCharts.value.clear()
  }
  const option = {
    title: {
      text: '总人数',
      subtext: props.total,
      x: 'center',
      y: '40%',
      textStyle: {
        fontSize: 14,
      },
      subtextStyle: {
        fontSize: 16,
        fontWeight: 'bolder',
        color: '#3e7dc4',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params:any) => {
        return params.marker + params.name + '<br>' +
            '数量：' + params.value +
            '<br>占比：' + params.data.count + '%'
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      x: 'center',
      icon: 'circle',
    },
    color: ['#fec03d', '#61a8f7', '#5bc4f6'],
    series: [
      {
        name: '疑点数',
        type: 'pie',
        center: ['50%', '45%'],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          formatter: (params:any) => {
            return params.value + '人'
          },
        },
        labelLine: {
          show: false,
        },
        data: props.pieData,
      }
    ],
  }
  pieCharts.value.setOption(option)
  pieCharts.value.off('click')
  pieCharts.value.on('click', (params:any) => {
    emit('pieClick',{ code: params.data.code, name: params.name})
  })
}
</script>

<template>
  <div>
    <div class="hosName"><img src="@/assets/icons/arrow.png"> {{ orgName }}</div>
    <div ref="pie" style="height: 300px" />
  </div>
</template>

<style scoped lang="scss">
.hosName{
  img{
    padding-bottom:3px;
    padding-right:5px;
    height: 30px;
  }
}
</style>
