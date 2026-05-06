<template>
  <div class="flex items-center gap-2">
    <template v-if="!authStore.isLoggedIn">
      <el-button type="primary" @click="goToLogin">登入</el-button>
    </template>
    <template v-else>
      <el-popover placement="bottom-end" :width="200" trigger="click">
        <template #reference>
          <el-button circle>
            <el-avatar :size="20">
              <el-icon :size="12"><UserFilled /></el-icon>
            </el-avatar>
          </el-button>
        </template>
        <h4>{{ authStore.userName }}</h4>
        <h6 class="mb-2 text-gray-400">{{ authStore.userMail }}</h6>
        <hr class="mb-2" />

        <el-button
          type="primary"
          size="small"
          class="w-full"
          @click="authStore.logout"
        >
          登出
        </el-button>
      </el-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { UserFilled } from "@element-plus/icons-vue";
import { FAKE_DATA } from "@/mock/fake-data";

const router = useRouter();
const authStore = useAuthStore();

// 模擬登入動作
// 還沒寫完
const handleLogin = () => {
  authStore.login(FAKE_DATA.user.userInfo, FAKE_DATA.user.token);
};

// 前往登入頁
const goToLogin = () => {
  router.push("/login");
};
</script>
