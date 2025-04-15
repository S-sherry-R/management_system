//角色管理模块的接口
import request from "@/utils/request.ts";
//引入数据类型
import type {ResponseData,Menu} from "./type.ts";

//枚举地址
enum API{
  //查询所有权限的树形结构
  GET_MENUS_URL = '/permission/menu/getAllMenus',
  //添加菜单
  ADD_MENU_URL = '/permission/menu/addMenu',
  //编辑菜单
  UPDATE_MENU_URL = '/permission/menu/updateMenu',
  //删除菜单
  DELETE_MENU_URL = '/permission/menu/deleteMenu'
}

//查询所有权限的树形结构
export const getAllMenus = () => request.get<any,ResponseData>(API.GET_MENUS_URL)
//添加与更新菜单
export const addOrUpdateMenu = (data:Menu) => {
  if(data.id && data.id!==''){
    return request.post<any,any>(API.UPDATE_MENU_URL,data)
  } else {
    return request.post<any,any>(API.ADD_MENU_URL,data)
  }
}
//删除菜单
export const deleteMenus = (ids:string[],parentId:string,id:string) => request.post<any,any>(API.DELETE_MENU_URL,{ids,parentId,id})
