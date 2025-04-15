//路由鉴权
import router from './router'
//进度条
//@ts-ignore
import nprogress from 'nprogress'
//进度条样式
import 'nprogress/nprogress.css'
//引入用户相关的仓库
import useUserStore from "@/store/modules/user.ts";
//引入配置相关信息
import setting from "@/setting.ts";
import pinia from "@/store";
import type {NavigationGuardNext} from "vue-router";
import {REMOVE_TOKEN} from "@/utils/token.ts";
const userStore = useUserStore(pinia)

//全局前置守卫
//@ts-ignore
router.beforeEach( async(to:any,from:any,next:NavigationGuardNext)=>{
  //进度条开始
  nprogress.start()
  //修改标题
  document.title = `${setting.title} - ${to.meta.title}` as string
  //判断用户是否登录
  const token = userStore.userState.token
  //获取用户名字
  const username = userStore.userState.username
  if(token) {
    //登录成功
    if(to.path === '/login'){
      next({path: '/'})
    } else {
      if(username){
        //如果有用户信息放行
        next()
      } else  {
        //如果没有用户信息则获取用户信息
        try {
          await userStore.userInfo()
          //判断上一次访问的页面是否在路由中
          const routes = router.getRoutes()
          const already = routes.filter(item => item.path === to.path)
          if(already && already.length > 0){
            //如果刷新的时候是异步路由，有可能获取到用户信息，异步路由还没有加载完毕，出现空白的效果
            //next({...to})保证加载完毕再放行
            next({...to,replace:true})
          } else {
            next({path: '/'})
          }
        } catch (error){
          //token过期，获取不到用户信息,退出登录
          userStore.userState.token = ''
          userStore.userState.username = ''
          userStore.userState.avatar = ''
          REMOVE_TOKEN()
          try {
            await userStore.logout()
            next({path: '/login',query: {redirect: to.path}})
          } catch (error){
            next({path: '/login',query: {redirect: to.path}})
          }
        }
      }
    }
  } else {
    //未登录
    if(to.path === '/login'){
      next()
    } else {
      next({path: '/login',query: {redirect: to.path}})
    }

  }
})
//全局后置守卫
router.afterEach(()=>{
  //进度条结束
  nprogress.done()
})
