import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import path from 'path'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  //获取各种环境对应的变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(),'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      mockDevServerPlugin(),
      //自动引入elementplus组件和样式
      AutoImport({
        resolvers: [ElementPlusResolver({
          importStyle: "sass"
        })],
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: "sass"
        })],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") //相对路径别名配置，使用@代替src
      }
    },
    server: {
      //代理服务器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取服务器地址的设置
          target: env.VITE_SERVE,
          //是否跨域
          changeOrigin: false,
          //是否重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    //scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`
        }
      }
    },
  }
})
