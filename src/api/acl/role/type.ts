

//用户信息
export interface Role{
  id?: string,
  createTime?: string,
  updateTime?: string,
  roleName?: string,
  menuId?: string,
}
//用户数组类型
export type Roles = Role[]
//接口返回的数据
export interface ResponseData{
  status: number,
  message: string,
  data?: Roles,
  total?: number,
  size?: number, //一页多少个
  current?: number //当前多少页
}

