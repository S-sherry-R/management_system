<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="24" class="login_col">
        <el-form class="login_form" :model="loginForm" ref="loginForms" :rules="rules">
          <img src="../../../public/logo.png">
          <h1>Hello</h1>
          <h2>欢迎来到{{setting.title}}</h2>
          <el-form-item label="用户名" label-position="top" class="login_item" prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-position="top" class="login_item" prop="password">
            <el-input type="password" show-password :prefix-icon="Lock" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button :loading="loading" type="primary" @click="login">登录</el-button>
        </el-form>
      </el-col>
      <el-col :span="12" :xs="0"></el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { useRouter,useRoute } from "vue-router";
//引入用户相关的仓库
import useUserStore from "@/store/modules/user.ts";
//引入获取时间提示信息
import { getTimeMsg } from "@/utils/timeMsg.ts";
//引入系统名称
import setting from "@/setting.ts"
//获取路由
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
//获取表单
const loginForms = ref()
//表单数据
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
//按钮加载效果
let loading = ref(false)
//登录按钮回调
const login = async () => {
  await loginForms.value.validate()
  //开始加载
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    //获取上一次访问的路由
    const redirect:string = $route.query.redirect as string
    //跳转到首页
    $router.push({ path: redirect || '/'})
    //登录成功提示信息
    ElNotification({
      type: 'success',
      title: `HI,${getTimeMsg()}好`,
      message: '欢迎回来'
    })
  } catch (error) {
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  } finally {
    loading.value = false
  }
}
//表单规则
const rules = {
  username: [
    {required:true, min:5, max:10, message:'用户名长度应该大于6，小于10', trigger: 'change'}
  ],
  password: [
    {required:true, min:6, max:15, message:'用户名长度应该大于等于6，小于15', trigger: 'change'}
  ]
}
</script>


<style scoped lang="scss">
.login_container{
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/login_background.png") no-repeat center;
  background-size: cover;
  .el-row{
    display: flex;
    align-items: center;
    height: 100vh;
    .login_col{
      display: flex;
      justify-content: center;
      width: 100%;
      .login_form{
        background-color: rgba(250,250,250,.3);
        box-shadow: 0 0 10px 10px #DEE1FF;
        padding: 80px;
        width: 60%;
        color: $base-color;
        border-radius: 40px;
        img{
          height: 50px;
          margin-bottom: 8px;
          margin-right: 10px;
        }
        h1{
          font-size: 50px;
          font-weight: bolder;
          display: inline;
          vertical-align: middle;
        }
        h2{
          font-size: 30px;
          font-weight: bolder;
          margin-top: 20px;
          margin-bottom: 15px;
          color: #000;
        }
        .login_item{
          margin: 20px 0;
          .el-input{
            height: 50px;
          }
        }
        .el-button{
          width: 100%;
          margin-top:20px;
          height: 50px;
        }
      }
    }
  }



}
</style>
