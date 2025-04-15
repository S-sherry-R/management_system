<template>
  <!--  顶部-->
  <div class="role-operate">
    <span>角色管理</span>
    <div>
      <el-button type="primary" icon="CirclePlus" @click="addRole">添加角色</el-button>
      <el-button type="danger" icon="Delete" @click="showDelete">批量删除</el-button>
    </div>
  </div>
  <!--  表格-->
  <el-card class="role-contain">
    <el-form :inline = "true">
      <el-form-item>
        <el-input placeholder="请输入角色名" v-model="roleName">
          <template #append>
            <el-button class="search-btn" @click="searchTable()">搜索</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :border="true" ref="roleTable">
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="序号" type="index" width="60"/>
      <el-table-column property="id" label="id" show-overflow-tooltip/>
      <el-table-column property="roleName" label="角色名字" align="center" show-overflow-tooltip/>
      <el-table-column property="createTime" label="创建时间" align="center" show-overflow-tooltip/>
      <el-table-column property="updateTime" label="更新时间" align="center" show-overflow-tooltip/>
      <el-table-column property="operate" label="操作" fixed="right" align="center" min-width="300px">
        <template #="{ row }">
          <el-button type="primary" icon="User" @click="assignRoles(row)">分配权限</el-button>
          <el-button type="primary" icon="Edit" @click="editRole(row)">编辑</el-button>
          <el-popconfirm
              :title="`你确定要删除${row.roleName}吗？`"
              @confirm="deleteRole(row.id)"
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
  <!--  抽屉:分配权限-->
  <el-drawer v-model="drawer" :append-to-body="true" direction="rtl">
    <template #header>
      <span class="drawer-title">分配权限</span>
    </template>
    <template #default>
      <el-tree
          ref="tree"
          style="max-width: 600px"
          :data="menuData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="checkedKeys"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="saveMenu">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!--  对话框:添加和编辑角色-->
  <el-dialog
      v-model="dialogVisible"
      :title="roleinfo.id ? '编辑角色' : '添加角色'"
      width="500"
      align-center
  >
    <el-form :model="roleinfo" :rules="rules" ref="form">
      <el-form-item prop="roleName">
        <el-input v-model="roleinfo.roleName" placeholder="请输入角色名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <!--  提示对话框:未选择角色-->
  <el-dialog
      v-model="checkVisible"
      title="提示"
      width="500"
      align-center
  >
    <span>未选择角色，无法删除，请至少选择一个角色！</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!--  提示对话框:未选择菜单-->
  <el-dialog
      v-model="treeVisible"
      title="提示"
      width="500"
      align-center
  >
    <span>未选择权限，请至点击取消按钮或至少选择一个权限！</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="treeVisible = false">
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
    <span>确定删除所选的角色！</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteRole()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
//引入角色api
import { reqRoleInfo,reqAddOrUpdateRole,batchAndSingleDeleteRole,updateRoleMenu } from '@/api/acl/role'
import { getAllMenus } from "@/api/acl/menu";
//引入角色数据类型
import type { ResponseData, Roles, Role } from "@/api/acl/role/type.ts";
//引入权限数据类型
import type { ResponseData as MenuResponseData, Menus } from '@/api/acl/menu/type.ts'
import type { ElTree } from "element-plus";
import {ElMessage} from "element-plus";

//#region 表格相关的数据和方法
//page组件
const myPage = ref()
//用户名
let roleName = ref<string>('')
//表格数据
let tableData = ref<Roles>([])
//表格数据总条数
let total = ref<number>(0)
//查询表格数据的方法
const searchTable = async (currentPage?:number,pageSize?:number) =>{
  currentPage = myPage.value.currentPage
  pageSize = myPage.value.pageSize
  const result:ResponseData = await reqRoleInfo(currentPage as number,pageSize as number,roleName.value)
  if(result.status === 0){
    total.value = result.total || 0
    tableData.value = result.data || []
  }
}
//#endregion

//#region 修改和添加用户的数据和方法
//控制弹窗的显示与隐藏
let dialogVisible = ref<boolean>(false)
//角色弹窗的数据
let roleinfo = reactive<Role>({
  roleName: '',
  id: ''
})
//form组件
const form = ref<any>()
//@ts-ignore校验名字的回调函数
const validatorRoleName = (rule:any,value:any,callBack:any) => {
  if(value !==null && value.trim().length >=1 && value.trim().length <=20){
    callBack()
  }else {
    callBack(new Error('角色名字至少五位，最大20位'))
  }
}
//表单校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName}],
}
//添加用户按钮
const addRole = () => {
  dialogVisible.value = true
  Object.assign(roleinfo,{
    id: '',
    roleName: '',
  })
  nextTick(() => {
    form.value.clearValidate()
  })
}
//编辑用户的按钮
const editRole = (row:Role) => {
  dialogVisible.value = true
  Object.assign(roleinfo,row)
  nextTick(() => {
    form.value.clearValidate()
  })
}
//弹窗保存按钮
const save = async () => {
  //保存前校验规则，返回的是一个成功/失败的Promise对象
  await form.value.validate()
  const result:any = await reqAddOrUpdateRole(roleinfo)
  if(result.status === 0){
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: roleinfo.id ? '更新成功！' : '添加成功！'
    })
    if(!roleinfo.id) {
      //如果是添加则回到第一页
      myPage.value.currentPage = 1
    }
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

//#region 分配权限的数据和方法
//分配权限的drawer显示和隐藏
let drawer = ref<boolean>(false)
//权限数据
const menuData = ref<Menus>([])
//默认选中的key
const checkedKeys = ref<string[]>([])
//树形结构的定义
const defaultProps = {
  children: 'childrenList',
  label: 'menuName',
}
//树的实例
const tree = ref<InstanceType<typeof ElTree>>()
//提示框
let treeVisible = ref<boolean>(false)
//显示分配权限的按钮
const assignRoles = async (row:Role) => {
  Object.assign(roleinfo,row)
  checkedKeys.value = row.menuId ? row.menuId.split(',') : []
  const result:MenuResponseData = await getAllMenus()
  if(result.status === 0){
    drawer.value = true
    menuData.value = result.data || []
  }
}
//分配权限保存按钮
const saveMenu = async () => {
  // const half = tree.value?.getHalfCheckedKeys() || []
  let list = tree.value?.getCheckedKeys() || []
  // list = [...list,...half]
  // if(list?.length === 0) {
  //   treeVisible.value = true
  //   return
  // }
  const result = await updateRoleMenu(roleinfo.id as string,list?.join(',') as string)
  searchTable()
  if(result.status === 0){
    ElMessage({
      type: 'success',
      message: '分配成功！'
    })
    drawer.value = false
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
//#endregion

//#region 删除用户的数据和方法
//未选择用户对话框的显示与隐藏
let checkVisible = ref<boolean>(false)
//确定删除用户对话框的显示与隐藏
let deleteVisible = ref<boolean>(false)
//表格实例
const roleTable = ref()
//显示确定批量删除用户对话框
const showDelete = () => {
  if(roleTable.value.getSelectionRows().length === 0){
    checkVisible.value = true
  } else {
    deleteVisible.value = true
  }
}
//删除用户
const deleteRole = async (id?: string) => {
  let roleIds:string[] = []
  if(id){
    roleIds.push(id)
  }else {
    (roleTable.value.getSelectionRows() as Roles).forEach(item => {
      roleIds.push(item.id as string)
    })
  }
  const result = await batchAndSingleDeleteRole(roleIds)
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
.role-operate{
  display: flex;
  justify-content: space-between;
  span{
    font-size: 24px;
  }
  div button{
    width: 180px;
  }
}
.role-contain{
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
