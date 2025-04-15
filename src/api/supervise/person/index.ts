//用户管理模块的接口
import request from "@/utils/request.ts";
//引入数据类型
import type { OrgResponse,DisResponse,PersonResponse,ParamPerson } from "./type.ts";

//枚举地址
enum API{
  //机构信息
  ORG_INFO = '/supervise/person/orgInfo',
  //人数分部
  DISTRIBUTION = '/supervise/person/getDistribution',
  //排名
  INSPIRATION_RANK = '/supervise/person/getInspirationRank',
  //人员信息
  PERSON_INFO = '/supervise/person/personInfo'
}
export const getOrgInfo = (order: string) => request.get<any,OrgResponse>(API.ORG_INFO,{
  params: { order }
})
export const getDistribution = (orgId: string) => request.post<any,DisResponse>(API.DISTRIBUTION,{orgId})
export const getInspirationRank = (orgId: string,typeId?: string) => request.post<any,DisResponse>(API.INSPIRATION_RANK, {orgId,typeId})
export const personInfo = (params:ParamPerson) => request.post<any,PersonResponse>(API.PERSON_INFO,params)
