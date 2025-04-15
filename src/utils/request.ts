//axios二次封装：使用请求和响应拦截器
import axios from "axios";
import { ElMessage  } from 'element-plus'
//引入用户信息仓库
import useUserStore from "@/store/modules/user.ts";
//创建实例，配置路径，超时时间
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})
//request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  config.headers.authorization = userStore.userState.token
  //返回配置对象
  return config
})
request.interceptors.response.use((response)=>{
  //成功回调
  return response.data
},(error)=>{
  //失败回调
  let message:string = ''
  let status:number =error.response.status
  switch (status) {
    case 401:
      message = 'TOKEN过期'
      break
    case 403:
      message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = '网络出现问题'
      break
  }
  //提示错误语法
  ElMessage({
    type: 'error',
    message
  })
  return Promise.reject(error)
})

export default request
