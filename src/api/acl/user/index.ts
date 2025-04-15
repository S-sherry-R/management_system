//用户管理模块的接口
import request from "@/utils/request.ts";
//引入数据类型
import type {ResponseData, User, UserRoleResponse} from "./type.ts";

//枚举地址
enum API{
  //获取全部已有用户账号信息
  ALL_USER_URL = '/permission/user/userinfo',
  //添加一个新的用户账号
  ADD_USER_URL = '/permission/user/addUser',
  //更新用户
  UPDATE_USER_URL = '/permission/user/updateUser',
  //获取所有角色信息
  ALL_ROLE_URL = '/permission/role/getAllRoles',
  //获取所查询用户已有的角色
  GET_USER_URL = '/permission/user/getUserRoles',
  //给用户分配角色
  UPDATE_USER_ROLE_URL = '/permission/user/updateUserRole',
  //删除用户
  DELETE_USER_URL = '/permission/user/deleteUser'
}
//获取全部已有用户账号信息
// export const reqUserInfo = (page:number, limit:number) => request.get<any,ResponseData>(`${API.ALL_USER_URL}?${page}&${limit}`)
export const reqUserInfo = (page:number, limit:number, username:string) => request.get<any,ResponseData>(API.ALL_USER_URL,{
  params: { page, limit, username }
})
//添加与更新用户
export const reqAddOrUpdateUser = (data:User) => {
  if(data.id){
    return request.post<any,any>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any,any>(API.ADD_USER_URL, data)
  }
}
//获取所有角色信息
export const getAllRoles = () => request.get<any,UserRoleResponse>(API.ALL_ROLE_URL)
//获取所查询用户已有的角色
export const getUserRoles = (id:string) => request.get<any,any>(API.GET_USER_URL,{
  params: {id}
})
//给用户分配角色
export const updateUserRole = (data:User) => request.post<any,any>(API.UPDATE_USER_ROLE_URL,data)
//删除用户
export const batchAndSingleDeleteUser = (userIds:string[]) => request.post<any,any>(API.DELETE_USER_URL,userIds)

