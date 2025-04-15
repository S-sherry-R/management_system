//用户相关的接口
import request from '@/utils/request.ts'
import type {loginForm,responseData,userResponseData} from "@/api/user/type.ts";

enum API{
  LOGIN_URL = '/check/login',
  LOGOUT_URL = '/check/logout',
  USERINFO_URL = '/user/userinfo',
  UPDATE_AVATAR_URL = '/user/updateAvatar'
}
//登录接口
export const reqLogin = (data:loginForm)=>request.post<any,responseData>(API.LOGIN_URL,data)
//退出登录
export const reqLogout = () => request.post<any,responseData>(API.LOGOUT_URL)
//获取当前用户信息
export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL)
//更换用户头像
export const updateAvatar = (avatar:string) => request.post<any,any>(API.UPDATE_AVATAR_URL,{avatar})
