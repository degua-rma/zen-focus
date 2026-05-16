<template>
  <div class="login-view linear-bg">
    <div class="login-info glass-card">
      <div class="logo">ZEN FOCUS</div>
      <input
        type="text"
        name="email"
        :placeholder="$t('login.input-username')"
        class="glass-input"
      />
      <input
        type="password"
        name="password"
        :placeholder="$t('login.input-password')"
        class="glass-input"
      />
      <el-row :gutter="4" class="px-1">
        <el-col :span="12">
          <a href="" class="forgot-password">
            <el-icon class="mr-1"><QuestionFilled /></el-icon>
            <span>{{ $t("login.no-account") }}</span>
          </a>
        </el-col>
        <el-col :span="12">
          <a href="" class="forgot-password justify-end">
            <el-icon class="mr-1"><QuestionFilled /></el-icon>
            <span>{{ $t("login.forget-password") }}</span>
          </a>
        </el-col>
      </el-row>
      <button class="glass-main-button">{{ $t("login.sign-in") }}</button>
      <div class="text-divider">{{ $t("login.or") }}</div>
      <button class="glass-other-btn">
        <IconGoogle class="button-icon" />
        <span class="mx-auto">{{ $t("login.continue-google") }}</span>
      </button>
      <button class="glass-other-btn" @click="handleGuestLogin">
        <el-icon class="button-icon"><Avatar /></el-icon>
        <span class="mx-auto">{{ $t("login.continue-guest") }}</span>
      </button>
    </div>
    <ChangeLang type="login" />
  </div>
</template>

<script setup lang="ts">
import { Avatar, QuestionFilled } from "@element-plus/icons-vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import ChangeLang from "@/layout/ChangeLang.vue";

// 訪客登入
import { useRouter } from "vue-router";
const router = useRouter();
const handleGuestLogin = () => {
  router.push("/");
};
</script>

<style scoped lang="scss">
.logo {
  text-align: center;
  font-size: 28px;
  padding: 8px 0;
  letter-spacing: 2px;
  opacity: 0.5;
}

.linear-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, $light-color, $main-color);
}

.login-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-info {
  width: 100%;
  max-width: 500px;
}

.forgot-password {
  display: flex;
  align-items: center;
  font-size: $font-size-h5;
  color: $text-color;
  opacity: 0.6;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
}

.change-lang-btn {
  position: fixed;
  top: 12px;
  right: 12px;
}
</style>
