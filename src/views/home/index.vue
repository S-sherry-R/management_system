<template>
<!--  顶部-->
  <div class="home-header">
    <div class="left-div">
      <el-avatar :size="100" :src="getImageUrl(userStore.userState.avatar)" />
      <div>
        <div class="home-user">{{getTimeMsg()}}好，&nbsp;{{userStore.userState.username}}</div>
        <div class="home-title">{{setting.title}}</div>
      </div>
    </div>
    <img src="../../assets/images/home_header.png" class="right-img">
  </div>
<!--  底部-->
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="col-info col-center">
        <img src="@/assets/images/org.png">
        <span>基金会对外巡查组</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="col-info">
      </div>
    </el-col>
    <el-col :span="4">
      <div class="col-info">
        <div class="col-title">尺寸</div>
        <div class="col-center" style="height: 100px">
          62 63/64×29 13/16×8 17/64in.
        </div>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="col-info">
        <div class="col-title" style="margin-bottom: 20px">调频</div>
        <div class="col-brand">
          <span class="col-tag">
            <el-tooltip content="平和" placement="top-start">
              <img src="@/assets/images/pattem4.png">
            </el-tooltip>
          </span>
          <span class="col-tag">
            <el-tooltip content="沉静" placement="top-start">
              <img src="@/assets/images/pattem3.png">
            </el-tooltip>
          </span>
          <span class="col-tag">
            <el-tooltip content="亢奋" placement="top-start">
              <img src="@/assets/images/pattem2.png">
            </el-tooltip>
          </span>
          <span class="col-tag">
            <el-tooltip content="节制" placement="top-start">
              <img src="@/assets/images/pattem1.png">
            </el-tooltip>
          </span>
          <span class="col-tag">
            <el-tooltip content="足餍" placement="top-start">
              <img src="@/assets/images/pattem5.png">
            </el-tooltip>
          </span>
          <span class="col-tag">
            <el-tooltip content="安恬泰然" placement="top-start">
              <img src="@/assets/images/pattem6.png">
            </el-tooltip>
          </span>
        </div>
      </div>
    </el-col>
  </el-row>
  <div style="display: flex;justify-content: center"><UnderDevelopment></UnderDevelopment></div>
</template>
<script setup lang="ts">
//引入用户相关仓库
import useUserStore from "@/store/modules/user.ts";
const userStore = useUserStore()
//引入时间处理函数
import { getTimeMsg } from "@/utils/timeMsg.ts";
//引入设置相关
import setting from "@/setting.ts";
//图片动态绑定
const getImageUrl = (name:string) => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href
}
</script>


<style scoped lang="scss">
.home-header{
  height: 200px;
  border-radius: 10px;
  background: linear-gradient(to top, #3952be,#5a7aff);
  display: flex;
  justify-content: space-between;
  color: #fff;
  margin-bottom: 20px;
  .left-div{
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 50px;
    div{
      margin-left:15px;
      .home-user{
        font-size: 30px;
        font-weight: 700;
      }
      .home-title{
        font-style: italic;
        margin-top: 15px
      }
    }
  }
  .right-img{
    height: 200px;
  }
}
.col-info{
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  height: 150px;
  font-size: 18px;
  .col-title{
    font-weight: 600;
    font-size: 18px;
  }
  .col-brand{
    display: flex;
    justify-content: space-evenly;
    .col-tag{
      padding: 10px;
      width: 70px;
      height: 70px;
      border-radius: 35px;
      background-color: rgba(62, 88, 200, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

}
.col-center{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    height: 40px;
    margin-bottom: 10px;
  }
  span{
    font-size: 20px;
    color: $base-color;
    font-weight: 600;
  }
}
</style>
