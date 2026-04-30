<template>
  <!-- border-b 畫出一條細細的分隔線，這就是大廠質感 -->
  <nav
    class="flex items-center justify-between px-8 py-2 border-b border-gray-300"
  >
    <div class="logo text-lg text-gray-400 italic">ZEN FOCUS</div>

    <!-- 妳建立的登入狀態組件 -->
    <LoginStatus />
  </nav>
</template>

<script setup lang="ts">
import LoginStatus from "@/layout/LoginStatus.vue";
</script>
