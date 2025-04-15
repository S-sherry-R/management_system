

//菜单信息
export interface Menu{
  id?: string,
  createTime?: string,
  updateTime?: string,
  menuName: string,
  level?: number,
  childrenList?: Menus,
  children?:string,
  code?: string,
  parentId?: string
}
//菜单数组类型
export type Menus = Menu[]
//接口返回的数据
export interface ResponseData{
  status: number,
  message: string,
  data?: Menus,
}

