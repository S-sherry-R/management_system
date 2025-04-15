<script setup lang="ts">
import type { chartArr } from '@/api/supervise/person/type.ts'
import { ref,watch } from 'vue'
import * as chart from 'echarts'
const emit = defineEmits(['closeTag'])
const props = defineProps({
  orgName:String,
  name: String,
  rankData: {
    type: Array,
    default: []
  },
  rowNameNum: Number
})
const myChart = ref()
const rank = ref()
watch(props,()=>{
  drawCharts()
})
//关闭tag
const handleClose = () =>{
  emit('closeTag')
}
const drawCharts = () => {
  const data:chartArr = props.rankData as chartArr
  if(!myChart.value){
    myChart.value = chart.init(rank.value)
    myChart.value.clear()
  }
  let xdata = []
  let otherRich:any = {}
  let max:number = 0
  for (let i = data?.length - 1; i >= 0; i--) {
    let number = i + 1
    xdata.push(number)
    if (i >= 3) {
      otherRich[number] = {
        width: 15,
        height: 15,
        fontSize: 10,
        lineHeight: 15,
        color: 'white',
        align: 'center',
        backgroundColor: '#72b1f8',
        borderRadius: 100,
      }
    }
    if (Number(data[i].value) > max) {
      max = Number(data[i].value)
    }
  }
  const option = {
    calculable: false,
    yAxis: [{
      data: xdata,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        inside: true,
        verticalAlign: 'bottom',
        margin: -8,
        padding: 8,
        formatter: function (value:string) {
          return `{${value}|${value}}`
        },
        rich: {
          1: {
            width: 15,
            height: 15,
            fontSize: 10,
            lineHeight: 15,
            color: 'white',
            align: 'center',
            backgroundColor: '#ff6d6d',
            borderRadius: 100,
          },
          2: {
            width: 15,
            height: 15,
            fontSize: 10,
            lineHeight: 15,
            color: 'white',
            align: 'center',
            backgroundColor: '#ffaf62',
            borderRadius: 100,
          },
          3: {
            width: 15,
            height: 15,
            fontSize: 10,
            lineHeight: 15,
            color: 'white',
            align: 'center',
            backgroundColor: '#feca5b',
            borderRadius: 100,
          },
          4: {
            width: 15,
            height: 15,
            fontSize: 10,
            lineHeight: 15,
            color: 'white',
            align: 'center',
            backgroundColor: '#72b1f8',
            borderRadius: 100,
          },
          ...otherRich,
          value: {
            backgroundColor: 'red',
            align: 'center',
          },
        },
      },
    },
      {
        data: xdata,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          padding: 8,
          align: 'right',
          verticalAlign: 'bottom',
          //@ts-ignore
          formatter: function (value:any, index:any) {
            return '人数：' + data[index].value
          },
          textStyle: { color: '#000', },
          rich: {
            a: {
              color: 'red',
            },
            b: {
              color: 'green',
            },
          },
        },
      }
    ],
    grid: {
      x: '20px',
      x2: '20px',
      y: '5px',
      y2: '-10px',
    },
    xAxis: [{
      name: '',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      max
    }],
    series: [{
      name: '',
      type: 'bar',
      barWidth: 10,
      showBackground: true,
      label: {
        show: true,
        position: [20, '-160%'],
        textStyle: {
          align: 'left',
          color: '#1b65b9',
          fontSize: '12px',
        },
        formatter: (params:any) => {
          if(props.rowNameNum && params.name.length > props.rowNameNum){
            return params.name.substr(0,props.rowNameNum) + '...'
          }else{
            return params.name
          }

        },
      },
      itemStyle: {
        normal: {
          color: function (params:any) {
            const colorList = ['#ff6d6d', '#ffaf62', '#feca5b', '#72b1f8']
            if (params.dataIndex >= 3) {
              return colorList[xdata.length - params.dataIndex - 1]
            } else {
              return '#72b1f8'
            }
          },
        },
      },
      data: data,
    }],
  }
  myChart.value.setOption(option)
  window.addEventListener('resize',() =>{
    myChart.value.clear()
    myChart.value.resize()
    myChart.value.setOption(option)
  })
}
</script>

<template>
  <div style="position: relative">
    <div class="hosName"><img src="@/assets/icons/arrow.png"> {{ orgName }}</div>
    <el-tag type="danger" closable style="margin-left: 20px" v-if="name" @close="handleClose">{{ name }}</el-tag>
    <div ref="rank" style="height: 300px" />
  </div>
</template>

<style scoped lang="scss">
.hosName{
  display: inline;
  img{
    padding-bottom:3px;
    padding-right:5px;
    height: 30px;
  }
}
</style>
