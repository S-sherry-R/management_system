<template>
  <el-card class="menu-contain">
    <el-table
        :data="tableData"
        :tree-props="treeProps"
        row-key="id"
        border
        default-expand-all
    >
      <el-table-column prop="menuName" label="菜单名称" align="center" width="200px"/>
      <el-table-column prop="code" label="权限值" align="center" />
      <el-table-column prop="updateTime" label="修改时间" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column property="operate" label="操作" fixed="right" align="center" min-width="300px">
        <template #="{ row }">
          <el-button type="primary" icon="DocumentAdd" @click="addMenu(row)">添加菜单</el-button>
          <el-button type="primary" icon="Edit" @click="editMenu(row)" :disabled="row.level === 0">编辑</el-button>
          <el-popconfirm
              :title="`你确定要删除${row.menuName}吗？`"
              @confirm="deleteMenu(row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
              width="300px">
            <template #reference>
              <el-button type="danger" icon="Delete" :disabled="row.level === 0">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!--  对话框:添加和编辑菜单-->
  <el-dialog
      v-model="dialogVisible"
      :title="isAdd ? '添加菜单' : '编辑菜单'"
      width="600"
      align-center
  >
    <el-form :model="menuInfo" :rules="rules" ref="form" label-width="80" style="margin-top:10px">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="menuInfo.menuName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input v-model="menuInfo.code" placeholder="请输入权限值"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <!--  对话框:删除确认对话框-->
  <el-dialog
      v-model="deleteVisible"
      title="删除"
      width="600"
      align-center
  >
      <span style="color: #f56c6c">当前菜单下面含有子菜单，删除该菜单将会把子菜单一起删除，是否确定删除？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDelete">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue'
//引入api
import { getAllMenus, addOrUpdateMenu, deleteMenus } from "@/api/acl/menu";
//引入数据机构
import type { ResponseData, Menus, Menu } from '@/api/acl/menu/type.ts'
import {ElMessage} from "element-plus";

//#region 表格数据和方法
//表格数据
const tableData = ref<Menus>([])
//树形结构的定义
const treeProps = {
  children: 'childrenList',
}
//获取表格数据
const searchTable = async () => {
  const result:ResponseData = await getAllMenus()
  if(result.status === 0){
    tableData.value = result.data || []
  }
}
//#endregion

//#region 添加，修改数据和方法
//菜单信息
let menuInfo = reactive<Menu>({
  menuName: '',
  code: ''
})
//对话框的显示和隐藏
let dialogVisible = ref<boolean>(false)
//表单实例
const form = ref()
//判断是编辑按钮还是添加按钮
let isAdd = ref<boolean>(true)
//@ts-ignore校验名字的回调函数
const validatorMenuName = (rule:any,value:any,callBack:any) => {
  if(value !==null && value.trim().length >=1){
    callBack()
  }else {
    callBack(new Error('菜单名称至少一位'))
  }
}
//@ts-ignore
const validatorCode = (rule:any,value:any,callBack:any) => {
  if(value !==null && value.trim().length >=2){
    callBack()
  }else {
    callBack(new Error('权限值至少两位'))
  }
}
//表单校验规则
const rules = {
  menuName: [{ required: true, trigger: 'blur', validator: validatorMenuName}],
  code: [{ required: true, trigger: 'blur', validator: validatorCode}],
}
//添加菜单按钮
const addMenu = (row:Menu) => {
  isAdd.value = true
  dialogVisible.value = true
  Object.assign(menuInfo,row,{menuName: '', code: ''})
}
//编辑菜单按钮
const editMenu = (row:Menu) => {
  isAdd.value = false
  dialogVisible.value = true
  Object.assign(menuInfo,row)
}
//对话框保存按钮
const save =async () => {
  //保存前校验规则，返回的是一个成功/失败的Promise对象
  await form.value.validate()
  if(isAdd.value){
    const id = menuInfo.id
    Object.assign(menuInfo,{ id: '', parentId: id})
  }
  const result:any = await addOrUpdateMenu(menuInfo)
  if(result.status === 0){
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: isAdd ? '添加成功！' : '编辑完成！'
    })
    await searchTable()
  } else {
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
//#endregion

//#region 删除相关的数据和方法
// 删除确定框的显示和隐藏
let deleteVisible = ref<boolean>(false)
//删除菜单
const deleteMenu = (menu:Menu) => {
  Object.assign(menuInfo,menu)
  if(menu.childrenList && menu.childrenList?.length > 0){
    deleteVisible.value = true
  } else {
    saveDelete()
  }
}
//确定删除
const saveDelete = async () => {
  const ids:string[] = []
  findIds(menuInfo, ids)
  const result = await deleteMenus(ids,menuInfo.parentId as string,menuInfo.id as string)
  if(result.status === 0){
    deleteVisible.value = false
    ElMessage({
      type:'success',
      message: '删除成功'
    })
    searchTable()
  } else {
    deleteVisible.value = false
    ElMessage({
      type:'error',
      message: result.message
    })
  }
}
//找到菜单下子菜单所有的id
const findIds = (menu:Menu,ids:string[]) => {
  if((menu.childrenList as Array<Menu>).length > 0){
    ids.push(menu.id as string)
    menu.childrenList?.forEach(item => {
      findIds(item,ids)
    })
  } else {
    ids.push(menu.id as string)
  }
}
//#endregion

//初始化
onMounted( () => {
  searchTable()
})
</script>

<style scoped lang="scss">
.menu-contain {
  margin-top: 10px;
  border-radius: 10px;
}
</style>
