import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
//配置element-plus国际化
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入svg插件
//@ts-ignore
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import gloalComponent from '@/components'
//引入全局样式
import '@/styles/index.scss'
//引入路由
import router from './router'
import './permission.ts'
//引入仓库
import pinia from "@/store";
//element中弹窗样式
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
//安装element-plus
// app.use(ElementPlus,{
//   locale: zhCn,//element-plus国际化
// })
//安装自定义插件:注册整个项目全局组件
app.use(gloalComponent)
//安装仓库
app.use(pinia)
//注册路由
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})

