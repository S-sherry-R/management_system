import type { RouteRecordRaw } from "vue-router";

export interface userState{
  dynamicRoutes: any[];
  token?: string | null,
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string
}
