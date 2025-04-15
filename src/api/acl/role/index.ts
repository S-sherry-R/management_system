//角色管理模块的接口
import request from "@/utils/request.ts";
//引入数据类型
import type {ResponseData, Role} from "./type.ts";

//枚举地址
enum API{
  //获取全部已有角色账号信息
  ALL_ROLE_URL = '/permission/role/roleInfo',
  //添加一个新的角色账号
  ADD_ROLE_URL = '/permission/role/addRole',
  //更新角色
  UPDATE_ROLE_URL = '/permission/role/updateRole',
  //删除角色
  DELETE_ROLE_URL = '/permission/role/deleteRole',
  //分配权限
  SET_ROLE_MENU_URL = '/permission/role/updateRoleMenu'
}
//获取全部已有角色账号信息
export const reqRoleInfo = (page:number, limit:number, roleName:string) => request.get<any,ResponseData>(API.ALL_ROLE_URL,{
  params: { page, limit, roleName }
})
//添加与更新角色
export const reqAddOrUpdateRole = (data:Role) => {
  if(data.id){
    return request.post<any,any>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<any,any>(API.ADD_ROLE_URL, data)
  }
}
//删除角色
export const batchAndSingleDeleteRole = (roleIds:string[]) => request.post<any,any>(API.DELETE_ROLE_URL,roleIds)
//分配权限
export const updateRoleMenu = (id:string,menuId:string) => request.post<any,any>(API.SET_ROLE_MENU_URL,{id,menuId})

