<template>
  <el-row :gutter="20" class="person-top">
    <el-col :span="8">
      <el-card class="top-card">
        <Title>机构信息</Title>
        <el-table
            :data="orgData"
            style="width: 100%"
            :border="true"
            ref="orgTable"
            @sort-change="orgSortChange"
            @row-click="orgRowClick"
            :row-style="rowStyle"
            :default-sort="{ prop: 'personCount', order: 'descending' }">
          <el-table-column property="id" label="序号" type="index" width="60"/>
          <el-table-column property="orgName" label="机构名称" align="center" show-overflow-tooltip/>
          <el-table-column property="orgLevel" label="机构等级" align="center" show-overflow-tooltip>
            <template #default="scope">
              <el-tag type="warning">{{ scope.row.orgLevel }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column property="personCount" label="人数" align="center" show-overflow-tooltip sortable="custom"/>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="top-card">
        <Title>人数分布</Title>
        <count-pie :pie-data="pieData" :total="total" :org-name="orgInfo.orgName" @pie-click="pieClick"></count-pie>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="top-card">
        <Title>灵感排名</Title>
        <rank-bar :rank-data="rankData" :row-name-num="22" :org-name="orgInfo.orgName" :name="pieInfo.name" @close-tag="closeTag"></rank-bar>
      </el-card>
    </el-col>
  </el-row>
  <el-card>
    <Title>人员信息
      <template #other>
        <el-input placeholder="请输入姓名或英文名" v-model="nameStr" style="float: right;width: 300px">
          <template #append>
            <el-button class="search-btn" @click="searchPerson()">搜索</el-button>
          </template>
        </el-input>
      </template>
    </Title>
    <el-table
        :data="personData"
        style="width: 100%"
        :border="true"
        ref="personTable"
        @sort-change="personSortChange"
        :default-sort="{ prop: personOrder.orderRow, order: personOrder.order }">
      <el-table-column property="id" label="序号" type="index" width="60"/>
      <el-table-column property="id" label="id" show-overflow-tooltip/>
      <el-table-column property="name" label="姓名" align="center" show-overflow-tooltip/>
      <el-table-column property="enName" label="英文名" align="center" show-overflow-tooltip/>
      <el-table-column property="level" label="等级" align="center" show-overflow-tooltip sortable="custom"/>
      <el-table-column property="trustPercent" label="信任" align="center" show-overflow-tooltip sortable="custom"/>
      <el-table-column property="insight" label="洞悉" align="center" show-overflow-tooltip sortable="custom"/>
      <el-table-column property="portrait" label="塑造" align="center" show-overflow-tooltip sortable="custom"/>
      <el-table-column property="resonance" label="共鸣" align="center" show-overflow-tooltip sortable="custom"/>
      <el-table-column property="inspiration" label="灵感" align="center" show-overflow-tooltip/>
      <el-table-column property="type" label="类型" align="center" show-overflow-tooltip/>
    </el-table>
    <MyPage @searchTable="searchPerson" :total="personTotal" ref="myPage"/>
  </el-card>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import type {chartValue,chartArr, Org, OrgArray, personArr,PersonResponse,ParamPerson} from '@/api/supervise/person/type.ts'
import CountPie from "@/views/supervise/person/countPie.vue";
import RankBar from "@/views/supervise/person/rankBar.vue";
import { getOrgInfo,getDistribution,getInspirationRank,personInfo } from '@/api/supervise/person/index.ts'

//#region 机构信息数据和方法
//机构数据
const orgData = ref<OrgArray>()
//单个机构数据
const orgInfo = reactive<Org>({
  id: '',
  orgName: ''
})
//机构排序方式
const orgOrder = ref<string>('descending')
//表格的状态显示
const rowStyle = ({ row }:{ row:Org }) => {
  if(orgInfo.id === row.id){
    return { backgroundColor: 'rgba(90,122,255,0.2)', cursor: 'pointer'}
  }
  return { cursor: 'pointer' }
}
//机构人数排序切换方法
const orgSortChange = (data:{column: any, prop: string, order: any }) =>{
  orgOrder.value = data.order
  searchOrg()
}
//表格行点击事件
const orgRowClick = (row: any) =>{
  Object.assign(orgInfo,row)
  searchPie()
  searchRank()
}
//查询机构信息
const searchOrg = async (first?:number) => {
  const result = await getOrgInfo(orgOrder.value === 'descending' ? 'DESC' : 'ASC')
  if(result.status === 0){
    orgData.value = result.data
    if(first === 1 && result.data){
      orgRowClick(result.data[0])
    }
  }
}
//#endregion

//#region 人数分布的数据和方法
//人数分布数据
const pieData = ref<chartArr>([])
//总人数
const total = ref<number>(0)
//pie点击的数据
const pieInfo = reactive<chartValue>({code:'',name:''})
//pie点击事件
const pieClick = (data:chartValue) => {
  Object.assign(pieInfo,data)
  searchRank()
}
const searchPie = async () =>{
  const result = await getDistribution(orgInfo.id)
  if(result.status === 0 && result.data){
    total.value = 0
    result.data.forEach((item) => total.value += item.value as number)
    pieData.value = result.data.map(item => ({...item, count: ((item.value as number / total.value) * 100).toFixed(2)}))
  }
}
//#endregion

//#region 灵感排名的数据和方法
//排名数据
const rankData = ref<chartArr>()
//关闭tag
const closeTag = () =>{
  Object.assign(pieInfo, {code:'',name:''})
  searchRank()
}
const searchRank = async () =>{
  const result = await getInspirationRank(orgInfo.id,pieInfo.code)
  if(result.status === 0 && result.data){
    rankData.value = result.data
  }
}
//#endregion

//#region 表格查询的数据和方法
//人员信息表格数据
const personData = ref<personArr>()
const personTotal = ref(0)
const myPage = ref()
//姓名
const nameStr = ref<string>('')
//排序
const personOrder = reactive<ParamPerson>({
  orderRow: 'level',
  order: 'descending'
})
//人员信息表格排序方法
const personSortChange = (data:{column: any, prop: string, order: any }) => {
  personOrder.orderRow = data.column.property
  personOrder.order = data.order
  searchPerson()
}
//人员表格查询方法
const searchPerson = async (currentPage?:number,pageSize?:number) =>{
  currentPage = myPage.value.currentPage
  pageSize = myPage.value.pageSize
  const param:ParamPerson = {
    orderRow: personOrder.orderRow,
    order: personOrder.order === 'descending' ? 'DESC' : 'ASC',
    page: currentPage,
    limit: pageSize,
    nameStr: nameStr.value
  }
  const result:PersonResponse = await personInfo(param)
  if(result.status === 0){
    personTotal.value = result.total || 0
    personData.value = result.data || []
  }
}
//#endregion
onMounted(() => {
  searchOrg(1)
  searchPerson()
})
</script>



<style scoped lang="scss">
.person-top{
  margin-bottom: 20px;
  .top-card{
    height: 400px;
  }
}
.search-btn{
  background-color: $base-color!important;
  color: #fff!important;
  border-radius: 0 4px 4px 0px!important;
}
.search-btn:hover{
  background-color: #7cabf2!important;
  color: #fff!important;
}
</style>
