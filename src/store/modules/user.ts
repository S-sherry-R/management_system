//用户相关的仓库
import { defineStore } from "pinia";
//引入接口
import {reqLogin, reqUserInfo, reqLogout} from "@/api/user";
//引入数据类型
import type { loginForm,responseData,userResponseData } from "@/api/user/type.ts";
import type { userState } from "@/store/modules/types/type.ts";
//引入本地存储方法
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from "@/utils/token.ts";
import {reactive} from 'vue'
//引入菜单
import { constanRoute, asyncRoute, anyRoute } from "@/router/routes.ts";
//引入路由器
import router from "@/router";
//引入深拷贝
import {cloneDeep} from "lodash";

const useUserStore = defineStore('User',() => {
  let userState = <userState>reactive({
    token: GET_TOKEN(),//用户的唯一标识token
    menuRoutes: constanRoute, //菜单
    dynamicRoutes: [], //动态路由
    username: '', //用户名
    avatar: '', //头像
  })
  //过滤异步路由
  function filterRoute(routes:string[],allRoutes:any){
    return allRoutes.filter((item:any) => {
      if(routes.includes(item.name)){
        if(item.children && item.children.length >0){
          item.children = filterRoute(routes,item.children)
        }
        return true
      }
    })
  }
  //用户登录方法
  async function userLogin(data:loginForm) {
    const result:responseData = await reqLogin(data)
    //登录成功
    if(result.status === 0){
      userState.token = result.token as string
      //持久化
      SET_TOKEN(result.token as string)
      return 'ok'
    } else {
      //登录失败
      return Promise.reject(new Error(result.message))
    }
  }
  //获取用户信息方法
  async function userInfo(){
    const result:userResponseData = await reqUserInfo()
    //获取信息成功
    if(result.status === 0){
      userState.username = result.data[0].username
      userState.avatar = result.data[0].avatar
      const userAsyncRoute = filterRoute(result.data[0].routes,cloneDeep(asyncRoute))
      //任意路由必须放在最后，不然刷新的时候提前匹配导致跳转到404
      userState.menuRoutes = [...constanRoute,...userAsyncRoute,anyRoute]
      const autoRoute = [...userAsyncRoute,anyRoute]
      userState.dynamicRoutes = userAsyncRoute
      autoRoute.forEach((route:any) => {
        router.addRoute(route)
      })
      return 'ok'
    } else {
      return Promise.reject('获取用户信息失败')
    }
  }
  //退出登录
  async function logout() {
    const result:responseData = await reqLogout()
    if(result.status === 0){
      userState.token = ''
      userState.username = ''
      userState.avatar = ''
      REMOVE_TOKEN()
      // 移除所有动态添加的路由
      userState.dynamicRoutes.forEach(route => router.hasRoute(route.path) && router.removeRoute(route.path));
      // 清空存储的动态路由信息
      userState.dynamicRoutes = [];
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  return { userState, userLogin,userInfo,logout }
})

export default useUserStore
