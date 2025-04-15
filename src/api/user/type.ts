//登录接口需要携带参数ts类型
export interface loginForm{
  username:string,
  password:string
}

//接口返回的数据类型
export interface responseData{
  status: number,
  token?:string,
  message?:string
}

//用户信息相关的数据类型
interface userInfo{
  id:string,
  avatar:string,
  username:string,
  password:string,
  desc:string,
  roles:string[],
  buttons:string[],
  routes:string[]
}
//用户相关接口返回的数据
export interface userResponseData{
  status:number,
  message: string,
  data:userInfo[]
}
