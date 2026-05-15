<template>
  <div class="main-layout">
    <div class="main-header">
      <a id="logo" href="/">ZEN FOCUS</a>
      <LoginStatus />
    </div>
    <div class="main-container">
      <div class="main-nav">
        <NavBar />
      </div>
      <div class="main-inner">
        <div class="main-page"><router-view /></div>
        <div class="main-footer">
          <p class="text-h6">版本資訊：v0 - 聯絡資訊</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/layout/NavBar.vue";
import LoginStatus from "@/layout/LoginStatus.vue";
</script>

<style lang="scss">
.main-layout {
  width: 100%;
  .main-header {
    width: 100%;
    height: $header-height;
    padding: 0 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    #logo {
      width: $nav-width;
      height: $header-height;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: $font-size-h2;
      font-style: italic;
      letter-spacing: $md-spacing;
      border-right: 1px solid #ddd;
    }
  }
  .main-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .main-nav {
      width: $nav-width;
      height: calc(100vh - $header-height);
      border-right: 1px solid #ddd;
      .el-menu {
        border-right: none;
      }
    }
    .main-inner {
      width: calc(100% - $nav-width);
      .main-page {
        width: 100%;
        height: calc(100vh - $header-height - $footer-height);
        padding: 32px;
      }
      .main-footer {
        width: 100%;
        height: $footer-height;
        border-top: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
