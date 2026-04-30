<template>
  <div class="flex items-center gap-4 p-2">
    <el-avatar :size="32">
      <el-icon><UserFilled /></el-icon>
    </el-avatar>

    <div class="text-sm">
      <span class="font-bold">{{ authStore.userName }}</span>
    </div>

    <el-button
      v-if="!authStore.isLoggedIn"
      type="primary"
      size="small"
      @click="handleLogin"
    >
      登入
    </el-button>

    <el-button
      v-else
      type="danger"
      size="small"
      plain
      @click="authStore.logout"
    >
      登出
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const handleLogin = () => {
  // 模擬登入動作
  authStore.login(
    { name: "預設名稱", email: "sample@example.com" },
    "fake-jwt-token",
  );
};
</script>
