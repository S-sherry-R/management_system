/**
 * 路由配置
 */
import { createRouter, createWebHashHistory } from "vue-router";
import {constanRoute} from "./routes.ts";

const router = createRouter({
  //路由模式
  history: createWebHashHistory(),
  routes: constanRoute,
  //滚动行为
  scrollBehavior(){
    return {
      left: 0,
      top: 0
    }
  }
})
export default router
