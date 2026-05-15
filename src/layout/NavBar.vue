<template>
  <nav class="glass-nav">
    <el-menu
      :default-active="activePath"
      :ellipsis="false"
      @select="handleSelect"
    >
      <template v-for="item in menuList" :key="item.path">
        <el-sub-menu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
        >
          <template #title>{{ item.title }}</template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
          >
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.path">
          {{ item.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { menuRoutes } from "@/router/index";

// 調用路由
const router = useRouter();
const route = useRoute();
// 當前頁面
const activePath = computed(() => route.path);
// MENU列表
const menuList = menuRoutes.map((route) => ({
  title: (route.meta?.title as string) || "",
  path: route?.path ?? "/",
  children: route.children
    ? route.children.map((child) => ({
        title: (child.meta?.title as string) || "",
        path: `${route.path}/${child.path}`.replace(/\/+/g, "/"),
      }))
    : null,
}));

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
