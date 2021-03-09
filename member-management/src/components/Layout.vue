<template>
  <div>
    <!-- 头部 -->
    <app-header> </app-header>
    <!-- 左侧导航 -->
    <app-navbar> </app-navbar>
    <!-- 主体部分 -->
    <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader"; //头部
import AppNavbar from "./AppNavbar"; //左侧导航
import AppMain from "./AppMain"; //右侧主体
export default {
  components: { AppHeader, AppNavbar, AppMain },
};
</script>

<style>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 50px;
  background-color: #2b3a4b;
}
.navbar {
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 230px;
  overflow-y: auto;
  background-color: #545c64;
}
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0;
  bottom: 0;
  padding: 10px;
  overflow-y: auto;
}
</style>

