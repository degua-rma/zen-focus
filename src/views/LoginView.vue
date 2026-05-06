<template>
  <div class="login-view linear-bg">
    <div class="login-info glass-card">
      <div class="logo">ZEN FOCUS</div>
      <input type="text" placeholder="Email or Username" class="glass-input" />
      <input type="password" placeholder="Enter Password" class="glass-input" />
      <div class="text-right">
        <a href="" class="forgot-password"
          ><el-icon><QuestionFilled /></el-icon>Forgot Password?</a
        >
      </div>
      <button class="glass-button">SIGN IN</button>
      <div class="divider">OR</div>
      <button class="other-btn">
        <IconGoogle class="button-icon" />
        <span>Continue with Google</span>
      </button>
      <button class="other-btn">
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
</style>
