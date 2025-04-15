/**
 * 自定义插件：注册整个项目全局组件
 */
import SvgIcon from './SvgIcon/index.vue'
//封装的分页组件
import MyPage from './MyPage/index.vue'
//标题
import Title from './Title/index.vue'
//开发中
import UnderDevelopment from './UnderDevelopment/index.vue'
//引入element中的图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局组件对象
const allGlobalComponent: Record<string, any> = {SvgIcon, MyPage, Title, UnderDevelopment}
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach(key => {
      //注册全局组件
      app.component(key, allGlobalComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
