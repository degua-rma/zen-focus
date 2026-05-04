<template>
  <nav class="flex items-center justify-between px-8 border-b border-gray-300">
    <div id="logo" @click="goToHome">ZEN FOCUS</div>
    <div class="flex items-center">
      <el-menu
        :default-active="activePath"
        class="pr-4"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item v-for="el in menuList" :key="el.path" :index="el.path">
          {{ el.title }}
        </el-menu-item>
      </el-menu>
      <LoginStatus />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { menuRoutes } from "@/router/index";
import LoginStatus from "@/layout/LoginStatus.vue";

// 調用路由
const router = useRouter();
const route = useRoute();
// 當前頁面
const activePath = computed(() => route.path);
// MENU列表
const menuList = menuRoutes.map((route) => ({
  title: (route.meta?.title as string) || "",
  path: route?.path ?? "/",
}));

// 回到首頁
const goToHome = () => {
  router.push("/");
};
// 選擇頁面
const handleSelect = (key: string) => {
  router.push(key);
};
</script>

<style scoped>
.el-menu--horizontal.el-menu {
  border-bottom: none;
}
</style>
