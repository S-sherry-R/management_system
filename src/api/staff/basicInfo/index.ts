//用户管理模块的接口
import request from "@/utils/request.ts";
//引入数据类型
import type {Basic, param, ResponseData} from "./type.ts";

//枚举地址
enum API{
  //基础信息表格
  BASIC_INFO = '/staff/basicInfo/getBasicInfo',
  //删除基础信息
  DELETE_BASIC = '/staff/basicInfo/deleteBasic',
  //修改
  UPDATE_BASIC = '/staff/basicInfo/updateBasic',
  //添加
  ADD_BASIC = '/staff/basicInfo/addBasic'
}
//基础信息表格
export const getBasicInfo = (param:param) => request.post<any,ResponseData>(API.BASIC_INFO,param)
//删除
export const deleteBasic = (ids: string[]) => request.post<any,any>(API.DELETE_BASIC,ids)
//修改或添加
export const updateOrAddBasic = (basic:Basic) => request.post<any,any>(basic.id ? API.UPDATE_BASIC: API.ADD_BASIC,basic)
