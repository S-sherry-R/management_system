<template>
  <div class="tab">
    <div class="tab-breadcrumb">
      <el-icon @click="changeIcon" class="flod-icon">
        <component :is="useSettingStore? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <template v-for="(item) in $route.matched">
          <el-breadcrumb-item  :to="item.path" v-if="item.meta.isShow">
            <el-icon style="vertical-align: bottom;margin-right: 2px">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="tab-setting">
      <el-button icon="Refresh" circle @click="refresh"></el-button>
      <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
<!--      <el-popover-->
<!--          placement="bottom"-->
<!--          title="主题颜色"-->
<!--          :width="200"-->
<!--          trigger="hover"-->

<!--      >-->
<!--        <el-form>-->
<!--          <el-form-item label="主题颜色">-->
<!--            <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="colorChange" :teleported="false"/>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <template #reference>-->
<!--          <el-button icon="Setting" circle></el-button>-->
<!--        </template>-->
<!--      </el-popover>-->
      <img :src="getImageUrl(userStore.userState.avatar)" @click="avatarVisible = true">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userStore.userState.username}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
<!--  头像修改-->
  <el-dialog
      v-model="avatarVisible"
      title="个人头像设置"
      width="600"
      align-center
  >
    <div class="avatar-list">
      <div v-for="item in 8" :key="item" @click="avatarRadio = item">
        <el-avatar :size="100" :src="getImageUrl('avatar' + item + '.jpg')" :class="avatarRadio === item ? 'avatar-active':''">
        </el-avatar>
        <el-icon class="avatar-icon" size="20" v-show="avatarRadio === item"><CircleCheckFilled /></el-icon>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="avatarVisible = false">取消</el-button>
        <el-button type="primary" @click="changeAvatar()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ElMessage} from "element-plus";

defineOptions({name: 'tabbar'})
import { ref } from 'vue'
//引入设置仓库
import useLayoutSettingStore from "@/store/modules/setting.ts";
//引入路由
import { useRoute,useRouter } from "vue-router";
//用户信息仓库
import useUserStore from "@/store/modules/user.ts";
//引入api
import { updateAvatar } from "@/api/user";

let useSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
let $route = useRoute()
let $router = useRouter()

//图片动态绑定
const getImageUrl = (name:string) => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href
}
//菜单收起展开事件
const changeIcon = () => {
  useSettingStore.isCollapse = !useSettingStore.isCollapse
}
//刷新事件
const refresh = () =>{
  useSettingStore.refresh = !useSettingStore.refresh
}
//全屏事件
const fullScreen = () => {
  if(document.fullscreenElement){
    //退出全屏
    document.exitFullscreen()
  } else {
    //进入全屏
    document.documentElement.requestFullscreen()
  }
}
//退出登录
const logout = async () => {
  await userStore.logout()
  $router.push({path:'/login',query:{redirect:$route.path}})
}
//头像弹窗的显示与隐藏
let avatarVisible = ref<boolean>(false)
let avatarRadio = ref<number>(0)
//修改头像
const changeAvatar = async () => {
  const result = await updateAvatar('avatar'+avatarRadio.value+'.jpg')
  if(result.status === 0){
    avatarVisible.value = false
    ElMessage({
      type: 'success',
      message: '修改头像成功！'
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
//取色器颜色
// const color = ref('#5a7aff')
// const predefineColors = ref([
//   '#ff4500',
//   '#ff8c00',
//   '#ffd700',
//   '#90ee90',
//   '#00ced1',
//   '#1e90ff',
//   '#c71585',
//   'rgba(255, 69, 0, 0.68)',
//   'rgb(255, 120, 0)',
//   'hsl(181, 100%, 37%)',
//   'hsla(209, 100%, 56%, 0.73)',
//   '#c7158577',
// ])
// //取色器颜色改变事件
// const colorChange = () =>{
//   document.documentElement.style.setProperty('--el-color-primary', color.value)
//   document.documentElement.style.setProperty('$base-color', color.value)
// }
</script>



<style scoped lang="scss">
.tab{
  display: flex;
  justify-content: space-between;
  height: 100%;
  .tab-breadcrumb{
    display: flex;
    align-items: center;
    img{
      height: 30px;
    }
    .flod-icon{
      margin: 0 10px;
      cursor: pointer;
    }
    .flod-icon:hover{
      color: $base-color;
    }
  }
  .tab-setting{
    display: flex;
    align-items: center;
    img{
      height: 30px;
      width: 30px;
      border-radius: 15px;
      margin: 0 12px;
      cursor: pointer;
    }
    .el-dropdown-link{
      cursor: pointer;
    }
  }
}
.avatar-list{
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  div{
    position: relative;
  }
  span{
    margin-left: 20px;
    margin-top: 15px;
    cursor: pointer;
  }
  span:hover,.avatar-active{
    border: 1px solid $base-color;
    box-shadow: 0 0 5px 2px $base-color;
  }
  .avatar-icon{
    color: $base-color;
    position: absolute;
    width: 16px;
    bottom: 4px;
    right: -6px
  }
}
</style>
