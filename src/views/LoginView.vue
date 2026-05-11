<template>
  <div class="login-view linear-bg">
    <div class="login-info glass-card">
      <div class="logo">ZEN FOCUS</div>
      <input
        type="text"
        name="email"
        placeholder="Email or Username"
        class="glass-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        class="glass-input"
      />
      <div class="text-right">
        <a href="" class="forgot-password">
          <el-icon class="mr-1"><QuestionFilled /></el-icon>
          <span>Forgot Password?</span>
        </a>
      </div>
      <button class="glass-main-button">SIGN IN</button>
      <div class="text-divider">OR</div>
      <button class="glass-other-btn">
        <IconGoogle class="button-icon" />
        <span>Continue with Google</span>
      </button>
      <button class="glass-other-btn">
        <el-icon class="button-icon"><Avatar /></el-icon>
        <span>Continue as Guest</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, QuestionFilled } from "@element-plus/icons-vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
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
  justify-content: flex-end;
  font-size: $font-size-h5;
  color: $text-color;
  opacity: 0.6;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
}
</style>
