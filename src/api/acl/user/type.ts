

//用户信息
export interface User{
  id?: string,
  createTime?: string,
  updateTime?: string,
  username?: string,
  nickname?: string,
  email?: string,
  roleName?: string,
  password?: string,
  roles?: string
}
//用户数组类型
export type Users = User[]
//接口返回的数据
export interface ResponseData{
  status: number,
  message: string,
  data?: Users,
  total?: number,
  size?: number, //一页多少个
  current?: number //当前多少页
}
//角色信息
export interface UserRole{
  id:string,
  roleName?: string
}
export type UserRoles = UserRole[]
//获取所有角色返回的数据
export interface UserRoleResponse{
  status: number,
  message: string,
  data?: UserRoles
}

