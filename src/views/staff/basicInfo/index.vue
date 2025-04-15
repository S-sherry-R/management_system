<template>
  <!--  顶部-->
  <div class="user-operate">
    <span>基础信息</span>
    <div>
      <el-button type="primary" icon="CirclePlus" @click="addBasic">添加人物</el-button>
      <el-button type="danger" icon="Delete" @click="showDelete">批量删除</el-button>
    </div>
  </div>
  <!--  表格-->
  <el-card class="user-contain">
    <el-form :inline = "true">
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="param.name">
          <template #append>
            <el-button class="search-btn" @click="searchTable()">搜索</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-select v-model="param.star" placeholder="星级" clearable style="width: 180px;margin-right: 20px" @change="searchTable()">
          <el-option v-for="item in starOptions" :key="item.value" :label="item.label" :value="item.value">
            <el-icon v-for="item in item.value"><StarFilled /></el-icon>
          </el-option>
        </el-select>
        <el-select v-model="param.type" placeholder="类型" clearable style="width: 240px" @change="searchTable()">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        ref="basicTable"
        @sort-change="sortChange"
        :default-sort="{ prop: 'star', order: 'descending' }">
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="序号" type="index" width="60"/>
      <el-table-column property="id" label="id" show-overflow-tooltip/>
      <el-table-column property="name" label="姓名" align="center" show-overflow-tooltip/>
      <el-table-column property="enName" label="英文名" align="center" show-overflow-tooltip/>
      <el-table-column property="star" label="星级" align="center" show-overflow-tooltip sortable="custom">
        <template #default="scope">
          <el-icon v-for="item in scope.row.star" color="#5a7aff"><StarFilled /></el-icon>
        </template>
      </el-table-column>
      <el-table-column property="inspiration" label="灵感" align="center" show-overflow-tooltip>
        <template #default="scope">
          <img :src="getInsImg(scope.row.inspiration)" style="height: 28px;margin-right: 10px"><span>{{scope.row.inspiration}}</span>
        </template>
      </el-table-column>
      <el-table-column property="type" label="类型" align="center" show-overflow-tooltip/>
      <el-table-column property="medium" label="介质" align="center" show-overflow-tooltip/>
      <el-table-column property="fragrance" label="香调" align="center" show-overflow-tooltip/>
      <el-table-column property="size" label="尺寸" align="center" show-overflow-tooltip/>
      <el-table-column property="operate" label="操作" fixed="right" align="center" min-width="200px">
        <template #="{ row }">
          <el-button type="primary" icon="Edit" @click="editBasic(row)">编辑</el-button>
          <el-popconfirm
              :title="`你确定要删除${row.name}吗？`"
              @confirm="deleteUser(row.id)"
              confirm-button-text="确定"
              cancel-button-text="取消"
              width="300px">
            <template #reference>
              <el-button type="danger" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <MyPage @searchTable="searchTable" :total="total" ref="myPage"/>
  </el-card>
  <!--  提示对话框:添加和修改-->
  <el-drawer v-model="visible">
    <template #header>
      <span class="drawer-title">{{basicInfo.id ? '修改' : '添加'}}</span>
    </template>
    <el-form
        :model="basicInfo"
        ref="form"
        label-width="100"
        label-suffix="："
        :rules="rules"
        style="margin-right: 40px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="basicInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="enName">
        <el-input v-model="basicInfo.enName"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="basicInfo.type" placeholder="">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="星级" prop="star">
        <el-rate v-model="basicInfo.star" :max="6" :colors="['#5a7aff','#5a7aff','#5a7aff']"/>
      </el-form-item>
      <el-form-item label="灵感" prop="inspiration">
        <el-radio-group v-model="insRadio">
          <el-radio :value="item.value" size="large" v-for="item in insOption">
            <img :src="getImageUrl(item.url)" style="height: 30px;margin-bottom: 10px">
          </el-radio>
        </el-radio-group>
        <el-input v-model="basicInfo.inspiration"></el-input>
      </el-form-item>
      <el-form-item label="介质" prop="medium">
        <el-input v-model="basicInfo.medium" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="香调" prop="fragrance">
        <el-input v-model="basicInfo.fragrance" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="尺寸" prop="size">
        <el-input v-model="basicInfo.size" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="save">确定</el-button>
        <el-button @click="visible = false">取消</el-button>
      </div>
    </template>
  </el-drawer>
  <!--  提示对话框:未选择表格数据-->
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="500"
      align-center
  >
    <span>未选择用户，无法删除，请至少选择一个用户！</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!--  提示对话框:确定删除-->
  <el-dialog
      v-model="deleteVisible"
      title="提示"
      width="500"
      align-center
  >
    <span>确定删除所选的用户！</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteUser()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick, watch } from "vue";
//引入基础api
import {deleteBasic, getBasicInfo, updateOrAddBasic} from '@/api/staff/basicInfo/index.ts'
//引入信息类型
import type {param, BasicArr, ResponseData, Basic} from '@/api/staff/basicInfo/type.ts'
import {ElMessage} from "element-plus";
const getImageUrl = (name:string) => {
  return new URL(`../../../assets/images/${name}`, import.meta.url).href
}

//#region 表格相关的数据和方法
//page组件
const myPage = ref()
//查询参数
let param = reactive<param>({
  name: '', star: '', type: ''
})
//星级选择项
const starOptions = [
  { value: 2, label: '2星'},
  { value: 3, label: '2星'},
  { value: 4, label: '4星'},
  { value: 5, label: '5星'},
  { value: 6, label: '6星'},
]
//类型选择项
const typeOptions = [
  { value: '超自然者'},
  { value: '意识唤醒者'},
  { value: '神秘学家'},
  { value: '神秘学家混血种'},
  { value: '神秘学家感染种'},
  { value: '人类'},
]
//表格数据
let tableData = ref<BasicArr>([])
//表格数据总条数
let total = ref<number>(0)
//排序
const order = ref<string>('DESC')
//获取灵感图片
const getInsImg = (str) => {
  let name = ''
  for (let item of insOption) {
    if(str.indexOf(item.value) !== -1){
      name = item.url
      break
    }
  }
  return new URL(`../../../assets/images/${name}`, import.meta.url).href
}
//排序
const sortChange = (data:{column: any, prop: string, order: any }) =>{
  order.value = data.order === 'descending' ? 'DESC' : 'ASC'
  searchTable()
}
//查询表格数据的方法
const searchTable = async (currentPage?:number,pageSize?:number) =>{
  currentPage = myPage.value.currentPage
  pageSize = myPage.value.pageSize
  Object.assign(param,{ limit: pageSize, page: currentPage, order: order.value})
  const result:ResponseData = await getBasicInfo(param)
  if(result.status === 0){
    total.value = result.total || 0
    tableData.value = result.data || []
  }
}
//#endregion

//#region 修改和添加用户的数据和方法
//控制弹框的显示与隐藏
let visible = ref<boolean>(false)
//弹框的数据
let basicInfo = reactive<Basic>({
  id: '',
  name: '',
  enName: '',
  star: 2,
  inspiration: '',
  type: '',
  medium: '',
  fragrance: '',
  size: ''
})
//form组件
const form = ref<any>()
//灵感单选值
const insRadio = ref<string>('')
//灵感选择项
const insOption = [
  {value: '灵',url:'spirit.png'},
  {value: '智',url:'intellect.png'},
  {value: '星',url:'star.png'},
  {value: '岩',url:'mineral.png'},
  {value: '木',url:'plant.png'},
  {value: '兽',url:'beast.png'},
]
watch(insRadio,() =>{
  basicInfo.inspiration = `[${insRadio.value}]`
})
//表单校验规则
const rules = {
  name: [{ required: true, trigger: 'blur', message: '长度大于1，小于20', min: 1, max: 20 }],
  enName: [{ required: true, trigger: 'blur', message: '长度大于1，小于20', min: 1, max: 20 }],
  type: [{ required: true, trigger: 'blur', message: '必选'}],
  star: [{ required: true, trigger: 'blur', message: '必选'}],
  inspiration: [{ required: true, trigger: 'blur', message: '必填'}],
}
//添加人物按钮
const addBasic = () => {
  visible.value = true
  Object.assign(basicInfo,{  id: '', name: '', enName: '', star: 2, inspiration: '', type: '', medium: '', fragrance: '', size: ''})
  form.value.clearValidate()
}
//编辑用户的按钮
const editBasic = (row:Basic) => {
  visible.value = true
  Object.assign(basicInfo,row)
  form.value.clearValidate()
}
//弹窗保存按钮
const save = async () => {
  //保存前校验规则，返回的是一个成功/失败的Promise对象
  await form.value.validate()
  const result:any = await updateOrAddBasic(basicInfo)
  if(result.status === 0){
    visible.value = false
    ElMessage({
      type: 'success',
      message: basicInfo.id ? '更新成功！' : '添加成功！'
    })
    if(!basicInfo.id) {
      //如果是添加则回到第一页
      myPage.value.currentPage = 1
    }
    await searchTable()
  } else {
    visible.value = false
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
//#endregion

//#region 删除用户的数据和方法
//未选择人物对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//确定删除人物对话框的显示与隐藏
let deleteVisible = ref<boolean>(false)
//表格实例
const basicTable = ref()
//显示确定批量删除人物对话框
const showDelete = () => {
  if(basicTable.value.getSelectionRows().length === 0){
    dialogVisible.value = true
  } else {
    deleteVisible.value = true
  }
}
//删除用户
const deleteUser = async (id?: string) => {
  let ids:string[] = []
  if(id){
    ids.push(id)
  }else {
    (basicTable.value.getSelectionRows() as BasicArr).forEach(item => {
      ids.push(item.id as string)
    })
  }
  const result = await deleteBasic(ids)
  deleteVisible.value = false
  if(result.status === 0){
    ElMessage({
      type: 'success',
      message: '删除成功！'
    })
    await searchTable()
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
//#endregion

//初始化
onMounted(() => {
  searchTable()
})
</script>

<style scoped lang="scss">
.user-operate{
  display: flex;
  justify-content: space-between;
  span{
    font-size: 24px;
  }
  div button{
    width: 180px;
  }
}
.user-contain{
  margin-top:15px;
  border-radius: 10px;
  height: calc(100% - 50px);
  .search-btn{
    background-color: $base-color;
    color: #fff;
    border-radius: 0 4px 4px 0px;
  }
  .search-btn:hover{
    background-color: #7cabf2;
    color: #fff;
  }
}
.drawer-title{
  color: #000;
  font-size: 20px;
}
</style>
