//机构信息
export interface Org{
  id: string,
  orgName: string,
  orgLevel?: string,
  personCount?: string
}
export type OrgArray = Org[]
export interface OrgResponse{
  status: number,
  message: string,
  data?: OrgArray
}
//人数分布
export interface chartValue{
  code: string,
  name: string,
  value?: number,
  count?: string
}
export type chartArr = chartValue[]
export interface DisResponse{
  status: number,
  message: string,
  data?: chartArr
}
//人员数据
export interface person{
  id: string,
  name: string,
  enName: string,
  level: string,
  trustPercent: number,
  insight: number,
  portrait: number,
  resonance: number,
  inspiration: string,
  type: string
}
export type personArr = person[]
export interface PersonResponse{
  status: number,
  message: string,
  data?: personArr,
  total?: number
}
export interface ParamPerson{
  orderRow: string,
  order: string,
  page?: number,
  limit?: number,
  nameStr?: string
}
