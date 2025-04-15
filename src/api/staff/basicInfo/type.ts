//查询参数
export interface param{
  name?: string,
  star?: string,
  type?: string,
  limit: number,
  page: number,
  orderName: string,
  order: string
}
//人员基本信息
export interface Basic{
  id: string,
  name: string,
  enName: string,
  star: number,
  inspiration: string,
  type: string,
  medium: string,
  fragrance: string,
  size: string
}
export type BasicArr = Basic[]
//表格返回参数
export interface ResponseData{
  status: number,
  message: string,
  data?: BasicArr
}
