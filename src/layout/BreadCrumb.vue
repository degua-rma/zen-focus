<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      <span :class="{ 'current-page': !breadcrumbs.length }">儀錶板</span>
    </el-breadcrumb-item>

    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span :class="{ 'current-page': index === breadcrumbs.length - 1 }">
        {{ item.meta?.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbs = computed(() => {
  // 撈出當前匹配到的所有路由節點
  return route.matched.filter((item) => {
    // 條件過濾：只有在路由有設定 meta 且有 title 的情況下才顯示在麵包屑上
    return item.meta && item.meta.title && item.name !== "dashboard";
  });
});
</script>

<style lang="scss" scoped>
.current-page {
  color: $main-color;
  cursor: default;
  font-weight: bold;
}
</style>
