<template>
<!--  顶部-->
  <div class="user-operate">
    <span>用户管理</span>
    <div>
      <el-button type="primary" icon="CirclePlus" @click="addUser">添加用户</el-button>
      <el-button type="danger" icon="Delete" @click="showDelete">批量删除</el-button>
    </div>
  </div>
<!--  表格-->
  <el-card class="user-contain">
    <el-form :inline = "true">
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="username">
          <template #append>
            <el-button class="search-btn" @click="searchTable()">搜索</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :border="true" ref="userTable">
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="序号" type="index" width="60"/>
      <el-table-column property="id" label="id" show-overflow-tooltip/>
      <el-table-column property="username" label="用户名字" align="center" show-overflow-tooltip/>
      <el-table-column property="nickname" label="用户昵称" align="center" show-overflow-tooltip/>
      <el-table-column property="roleName" label="用户角色" align="center" show-overflow-tooltip/>
      <el-table-column property="createTime" label="创建时间" align="center" show-overflow-tooltip/>
      <el-table-column property="updateTime" label="更新时间" align="center" show-overflow-tooltip/>
      <el-table-column property="operate" label="操作" fixed="right" align="center" min-width="300px">
        <template #="{ row }">
          <el-button type="primary" icon="User" @click="assignRoles(row)">分配角色</el-button>
          <el-button type="primary" icon="Edit" @click="editUser(row)">编辑</el-button>
          <el-popconfirm
              :title="`你确定要删除${row.username}吗？`"
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
<!--  抽屉:添加和修改用户-->
  <el-drawer v-model="drawer">
    <template #header>
      <span class="drawer-title">{{userinfo.id ? '修改用户' : '添加用户'}}</span>
    </template>
    <template #default>
      <el-form class="user-form" :model="userinfo" :rules="rules" ref="form">
        <el-form-item label="用户名字" prop="username">
          <el-input placeholder="请输入用户名字" v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input placeholder="请输入用户昵称" v-model="userinfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userinfo.id">
          <el-input placeholder="请输入用户密码" v-model="userinfo.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!--  抽屉：分配角色-->
  <el-drawer v-model="roleDrawer">
    <template #header>
      <span class="drawer-title">分配角色</span>
    </template>
    <template #default>
      <el-form class="user-form" :model="userinfo">
        <el-form-item label="用户名字" prop="username">
          <el-input v-model="userinfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表" prop="roles">
          <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">
            全选
          </el-checkbox>
        </el-form-item>
        <el-checkbox-group
            style="margin-left:68px"
            v-model="checkedRoles"
            @change="handleCheckedChange">
          <el-checkbox v-for="(item) in allRole"
                       :value="item.id"
                       :key="item.id"
                       :label="item.roleName">
          </el-checkbox>
        </el-checkbox-group>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelRole">取消</el-button>
        <el-button type="primary" @click="saveRole">确定</el-button>
      </div>
    </template>
  </el-drawer>
<!--  提示对话框:未选择用户-->
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
import { ref, onMounted, reactive, nextTick } from "vue";
//引入用户api
import { reqUserInfo,reqAddOrUpdateUser,getUserRoles,getAllRoles,updateUserRole,batchAndSingleDeleteUser } from '@/api/acl/user'
//引入用户数据类型
import type { ResponseData, Users, User, UserRoles } from "@/api/acl/user/type.ts";
//引入用户仓库
import useUserStore from "@/store/modules/user.ts";
import {ElMessage} from "element-plus";
const userStore = useUserStore()

//#region 表格相关的数据和方法
//page组件
const myPage = ref()
//用户名
let username = ref<string>('')
//表格数据
let tableData = ref<Users>([])
//表格数据总条数
let total = ref<number>(0)
//查询表格数据的方法
const searchTable = async (currentPage?:number,pageSize?:number) =>{
  currentPage = myPage.value.currentPage
  pageSize = myPage.value.pageSize
  const result:ResponseData = await reqUserInfo(currentPage as number,pageSize as number,username.value)
  if(result.status === 0){
    total.value = result.total || 0
    tableData.value = result.data || []
  }
}
//#endregion

//#region 修改和添加用户的数据和方法
//控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
//用户抽屉的数据
let userinfo = reactive<User>({
  username: '',
  nickname: '',
  password: ''
})
//保存未修改之前的用户名字
let currentUsername:string = ''
//form组件
const form = ref<any>()
//校验名字的回调函数
//@ts-ignore
const validatorUsername = (rule:any,value:any,callBack:any) => {
  if(value !==null && value.trim().length >=2 && value.trim().length <=20){
    callBack()
  }else {
    callBack(new Error('用户名字至少两位，最大10位'))
  }
}
//校验名字的回调函数
//@ts-ignore
const validatorNickname = (rule:any,value:any,callBack:any) => {
  if(value !==null && value.trim().length >=2 && value.trim().length <=20){
    callBack()
  }else {
    callBack(new Error('用户昵称至少两位,最大20位'))
  }
}
//校验密码的回调函数
//@ts-ignore
const validatorPassword = (rule:any,value:any,callBack:any) => {
  if(value !==null && value.trim().length >=6 && value.trim().length <=15){
    callBack()
  }else {
    callBack(new Error('用户昵称至少五位，最大15位'))
  }
}
//表单校验规则
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername}],
  nickname: [{ required: true, trigger: 'blur', validator: validatorNickname}],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword}],
}
//添加用户按钮
const addUser = () => {
  drawer.value = true
  Object.assign(userinfo,{
    id: '',
    username: '',
    nickname: '',
    password: ''
  })
  nextTick(() => {
    form.value.clearValidate()
  })
}
//编辑用户的按钮
const editUser = (row:User) => {
  currentUsername = row.username || ''
  drawer.value = true
  Object.assign(userinfo,row)
  nextTick(() => {
    form.value.clearValidate()
  })
}
//drawer保存按钮
const save = async () => {
  //保存前校验规则，返回的是一个成功/失败的Promise对象
  await form.value.validate()
  const result:any = await reqAddOrUpdateUser(userinfo)
  if(result.status === 0){
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userinfo.id ? '更新成功！' : '添加成功！'
    })
    if(!userinfo.id) {
      //如果是添加则回到第一页
      myPage.value.currentPage = 1
    }
    await searchTable()
    //判断修改的是否是当前用户，如果是则刷新页面
    if(userStore.userState.username === currentUsername){
      window.location.reload()
    }
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
//drawer取消按钮
const cancel = () => {
  drawer.value = false
}
//#endregion

//#region 分配角色的数据和方法
//角色分配的drawer显示和隐藏
let roleDrawer = ref<boolean>(false)
//所有角色
let allRole = ref<UserRoles>([])
//全选
let checkAll = ref<boolean>(false)
//全选的不确定状态
let isIndeterminate = ref<boolean>(false)
//已选的角色
let checkedRoles = ref<Array<string>>([])
//分配角色按钮
const assignRoles = async (row:User) => {
  roleDrawer.value = true
  Object.assign(userinfo,row)
  //获取所有角色
  const allRoles = await getAllRoles()
  //获取当前行用户已有的角色
  const userRoles = await getUserRoles(row.id as string)
  allRole.value = allRoles.data || []
  if(userRoles.data && userRoles.data.roles){
    checkedRoles.value = userRoles.data.roles.split(',') || []
    if(checkedRoles.value.length > 0){
      isIndeterminate.value = true
    }
    if(checkedRoles.value.length === allRole.value.length){
      isIndeterminate.value = false
      checkAll.value = true
    }
  }else {
    isIndeterminate.value = false
    checkedRoles.value = []
  }
}
//全选按钮的改变事件
const handleCheckAllChange = (val: boolean) => {
  const list:Array<string> = []
  allRole.value.forEach(item => {
    list.push(item.id)
  })
  checkedRoles.value = val ? list : []
  isIndeterminate.value = false
}
//多选按钮的改变事件
const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
//取消按钮
const cancelRole = () =>{
  roleDrawer.value = false
}
//确定按钮
const saveRole = async () => {
  isIndeterminate.value = false
  let roles:string = ''
  let roleName:string = ''
  allRole.value.forEach(item => {
    if(checkedRoles.value.includes(item.id)){
      roles += item.id + ','
      roleName += item.roleName + ','
    }
  })
  if(roles !== ''){
    roles = roles.substring(0,roles.length-1)
    roleName = roleName.substring(0,roleName.length-1)
  }
  const result = await updateUserRole({ id: userinfo.id, roles, roleName })
  if(result.status ===0 ){
    ElMessage({
      type: 'success',
      message: '分配成功！'
    })
    roleDrawer.value = false
    await searchTable()
  } else {
    ElMessage({
      type: 'error',
      message: '分配失败！'
    })
    roleDrawer.value = false
  }
}
//#endregion

//#region 删除用户的数据和方法
//未选择用户对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//确定删除用户对话框的显示与隐藏
let deleteVisible = ref<boolean>(false)
//表格实例
const userTable = ref()
//显示确定批量删除用户对话框
const showDelete = () => {
  if(userTable.value.getSelectionRows().length === 0){
    dialogVisible.value = true
  } else {
    deleteVisible.value = true
  }
}
//删除用户
const deleteUser = async (id?: string) => {
  let userIds:string[] = []
  if(id){
    userIds.push(id)
  }else {
    (userTable.value.getSelectionRows() as Users).forEach(item => {
      userIds.push(item.id as string)
    })
  }
  const result = await batchAndSingleDeleteUser(userIds)
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
