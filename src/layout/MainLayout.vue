<template>
  <div class="main-layout">
    <div class="main-header">
      <div class="card">
        <a id="logo" href="/">ZEN FOCUS</a>
        <div class="header-wrap">
          <BreadCrumb />
          <div class="flex items-center gap-2">
            <LoginStatus />
            <ChangeLang type="dashboard" />
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="main-nav">
        <div class="card">
          <el-scrollbar>
            <NavBar />
          </el-scrollbar>
        </div>
      </div>
      <div class="main-inner">
        <div class="main-page">
          <div class="card">
            <el-scrollbar>
              <router-view />
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/layout/NavBar.vue";
import ChangeLang from "@/layout/ChangeLang.vue";
import BreadCrumb from "@/layout/BreadCrumb.vue";
import LoginStatus from "@/layout/LoginStatus.vue";
</script>

<style lang="scss">
.main-layout {
  width: 100%;
  background: linear-gradient(
    135deg,
    var(--el-color-primary),
    var(--el-color-primary-light-5)
  );
  padding: calc($inner-padding / 2);
  .card {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(#fff, 0.9), rgba(#fff, 0.7));
    border: 1px solid var(--el-color-primary-light-9);
    border-radius: calc($border-radius / 2);
    box-shadow: none;
  }
  .main-header {
    width: 100%;
    padding: $inner-padding;
    .card {
      width: 100%;
      height: calc($header-height - $inner-padding * 3);
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
    }
    #logo {
      width: calc($nav-width - $inner-padding / 2);
      height: 100%;
      margin-right: calc($inner-padding / 2);
      border-right: 1px dashed var(--el-color-primary-light-7);
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: $font-size-h2;
      font-style: italic;
      letter-spacing: $md-spacing;
    }
    .header-wrap {
      width: calc(100% - $nav-width);
      height: 100%;
      padding: 0 calc($inner-padding * 2);
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      padding: $inner-padding;
      padding-top: 0;
      padding-right: 0;
      .card {
        padding: $inner-padding 0;
        overflow: hidden;
      }
      .el-menu {
        border-right: none;
        background-color: transparent;
      }
    }
    .main-inner {
      width: calc(100% - $nav-width);
      height: calc(100vh - $header-height);
      padding: $inner-padding;
      padding-top: 0;
      .main-page {
        width: 100%;
        height: 100%;
        .card {
          padding: calc($inner-padding * 2);
        }
      }
    }
  }
}
</style>
