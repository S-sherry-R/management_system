<template>
  <el-row class="in-main">
    <!-- 上左 -->
    <el-col :span="8">
      <div class="leftBox">
        <!-- 第一个条 -->
        <div @click="topclick1()">
          <el-row :class="[theone ? 'activeone_1 divBoxBtnActive' : 'activeone divBoxBtn']" align="middle">
<!--            <el-col :span="4">-->
<!--              <img src="@/assets/images/intellect.png" class="leftImg"/>-->
<!--            </el-col>-->
<!--            <el-col :span="20" :class="[theone ? 'active_font' : 'active_font_no']">-->
<!--              智 INTELLECT&nbsp;&nbsp;&nbsp;({{ 20 }})-->
<!--            </el-col>-->
          </el-row>
        </div>
        <!-- 第二条 -->
        <div @click="topclick2">
          <el-row :class="[thetwo ? 'activetwo_1 divBoxBtnActive' : 'activetwo divBoxBtn']" align="middle">
<!--            <el-col :span="4">-->
<!--              <img src="@/assets/images/spirit.png" class="leftImg"/>-->
<!--            </el-col>-->
<!--            <el-col :span="20" :class="[thetwo ? 'active_font' : 'active_font_no']" style="padding-left: 0.4vw">-->
<!--              灵 SPIRIT&nbsp;&nbsp;&nbsp;({{ 30 }})-->
<!--            </el-col>-->
          </el-row>
        </div>
        <!-- 第三条 -->
        <div @click="topclick3">
          <el-row :class="[thethree ? 'activethree_1 divBoxBtnActive' : 'activethree divBoxBtn']" align="middle">
<!--            <el-col :span="4">-->
<!--              <img src="@/assets/images/plant.png" class="leftImg"/>-->
<!--            </el-col>-->
<!--            <el-col :span="20" :class="[thethree ? 'active_font' : 'active_font_no']">-->
<!--              木 PLANT&nbsp;&nbsp;&nbsp;({{ 50 }})-->
<!--            </el-col>-->
          </el-row>
        </div>
      </div>
    </el-col>
    <!-- 上中 -->
    <el-col :span="6" style="z-index: 99;">
      <div class="midpic">
        <div>
          <img src="@/assets/images/center.png">
        </div>
      </div>
    </el-col>
    <!-- 上右 -->
    <el-col :span="8">
      <div class="rightBox">
        <!-- 第四条 -->
        <div @click="topclick4" >
          <el-row :class="[thefive ? 'activefive_1 divBoxBtnRightActive' : 'activefive divBoxBtnRight']" align="middle" justify="end">
<!--            <el-col :span="20" :class="[thefive ? 'active_font' : 'active_font_no']" >-->
<!--              <span style="float: right">岩 MINERAL&nbsp;&nbsp;&nbsp;({{ 10 }})</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="@/assets/images/mineral.png" class="rightImg"/>-->
<!--            </el-col>-->
          </el-row>
        </div>
        <!-- 第五条 -->
        <div @click="topclick5">
          <el-row :class="[thesix ? 'activesix_1 divBoxBtnRightActive' : 'activesix divBoxBtnRight']" align="middle" justify="end">
<!--            <el-col :span="11" :class="[thesix ? 'active_font' : 'active_font_no']" style="padding-left: 0.5vw">-->
<!--              <span style="float: right;margin-right: 0.5vw">星 STAR&nbsp;&nbsp;&nbsp;({{ 50 }})</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="@/assets/images/star.png" class="rightImg"/>-->
<!--            </el-col>-->
          </el-row>
        </div>
        <!-- 第六条 -->
        <div @click="topclick6" style="cursor: pointer;">
          <el-row :class="[thefour ? 'activeseven_1 divBoxBtnRightActive' : 'activeseven divBoxBtnRight']" align="middle" justify="end">
<!--            <el-col :span="11" :class="[thefour ? 'active_font' : 'active_font_no']">-->
<!--              <span style="float: right">兽 BEAST&nbsp;&nbsp;&nbsp;({{ 40 }})</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="@/assets/images/beast.png" class="rightImg"/>-->
<!--            </el-col>-->
          </el-row>
        </div>
      </div>
    </el-col>
    <UnderDevelopment></UnderDevelopment>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const theone = ref<boolean>(true)
const thetwo = ref<boolean>(false)
const thethree = ref<boolean>(false)
const thefour = ref<boolean>(false)
const thefive = ref<boolean>(false)
const thesix = ref<boolean>(false)
const topclick1=()=>{}
const topclick2=()=>{}
const topclick3=()=>{}
const topclick4=()=>{}
const topclick5=()=>{}
const topclick6=()=>{}
</script>

<style scoped lang="scss">
.in-main{
  display: flex;
  justify-content: space-between;
  .leftBox{
    width: 100%;
    height: 21vw;
    position: relative;
    top: 10%;
    left: 20%;
    .leftImg{
      margin-left: 1.5vw;
      height: 2.5vw;
      margin-top: 0.5vw;
    }
  }
  .leftBox>div{
    cursor: pointer;
  }
  .leftBox:after {
    content: '';
    background-color: #f5f5f5;
    height: 10vw;
    width: 10vw;
    position: absolute;
    left: 20vw;
    border-radius: 10vw;
    top: 2vw;
  }
  .midpic {
    height: 90%;
    width: 90%;
    border-radius: 50%;
    border: 20px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1vw;
    div{
      height: 80%;
      width: 80%;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        height: 80%;
      }
    }
  }
  .rightBox{
    width: 100%;
    height: 21vw;
    position: relative;
    top: 10%;
    .rightImg{
      height: 2.5vw;
      margin-top: 0.5vw;
      float: right;
      margin-right: 1.5vw;
    }
  }
  .rightBox>div{
    cursor: pointer;
  }
  .rightBox:after {
    content: '';
    background-color: #f5f5f5;
    height: 10vw;
    width: 10vw;
    position: absolute;
    left: -6vw;
    border-radius: 10vw;
    top: 2vw;
  }
}
.activeone {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
}
.activeone_1 {
  background-color: #faad14;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
}
.active_font {
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: #fefeff;
  font-size: 1vw;
}
.active_font_no {
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: $base-color;
  font-size: 1vw;
}
.activetwo {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 21vw;
  height: 4vw;
  top: 5.2vw;
}
.activetwo_1 {
  background-color: #faad14;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 21vw;
  height: 4vw;
  top: 5.2vw;
}
.activethree {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
  top: 10.3vw;
}
.activethree_1 {
  background-color: #faad14;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
  top: 10.3vw;
}
.activefour {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
  top: 15.5vw;
}
.activefour_1 {
  background-color: #faad14;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
  top: 15.5vw;
}
.activefive {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
  left: 0.6vw;
}
.activefive_1 {
  background-color: #faad14;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4vw;
  left: 0.6vw;
}
.activesix {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 21.1vw;
  height: 4.3vw;
  left: 2.9vw;
  top: 5.2vw;
}
.activesix_1 {
  background-color: #faad14;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 21.1vw;
  height: 4.3vw;
  left: 2.9vw;
  top: 5.2vw;
}
.activeseven {
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4.2vw;
  left: 0.6vw;
  top: 10.3vw;
}
.activeseven_1 {
  background-color: #faad14;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  width: 23.4vw;
  height: 4.2vw;
  left: 0.6vw;
  top: 10.3vw;
}
.divBoxBtn {
  background: linear-gradient(-45deg, transparent 0px, #fff 0) bottom right,
  linear-gradient(45deg, transparent 12px, #fff 0) bottom left,
  linear-gradient(135deg, transparent 12px, #fff 0) top left,
  linear-gradient(-135deg, transparent 0px, #fff 0) top right;
  background-size: 70% 70%;
  background-repeat: no-repeat;
}
.divBoxBtnRight {
  background: linear-gradient(-45deg, transparent 12px, #fff 0) bottom right,
  linear-gradient(45deg, transparent 0px, #fff 0) bottom left,
  linear-gradient(135deg, transparent 0px, #fff 0) top left,
  linear-gradient(-135deg, transparent 12px, #fff 0) top right;
  background-size: 70% 70%;
  background-repeat: no-repeat;
}
.divBoxBtnActive {
  background: linear-gradient(-45deg, transparent 0px, #faad14 0) bottom right,
  linear-gradient(45deg, transparent 12px, #faad14 0) bottom left,
  linear-gradient(135deg, transparent 12px, #faad14 0) top left,
  linear-gradient(-135deg, transparent 0px, #faad14 0) top right;
  background-size: 70% 70%;
  background-repeat: no-repeat;
}
.divBoxBtnRightActive {
  background: linear-gradient(-45deg, transparent 12px, #faad14 0) bottom right,
  linear-gradient(45deg, transparent 0px, #faad14 0) bottom left,
  linear-gradient(135deg, transparent 0px, #faad14 0) top left,
  linear-gradient(-135deg, transparent 12px, #faad14 0) top right;
  background-size: 70% 70%;
  background-repeat: no-repeat;
}
</style>
