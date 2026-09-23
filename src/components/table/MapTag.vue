<script setup lang="ts" generic="T extends string | number | symbol">
// 使用 Generic (泛型) 讓傳入的 value 型別保持彈性 (ActionCategory 或任何類型)
import type { TagProps } from "element-plus";
import type { Component } from "vue";

interface TagConfig {
  title: string;
  type?: TagProps["type"] | (string & {});
  icon?: Component;
}

const props = defineProps<{
  map: Record<T, TagConfig>; // 映射表 (例如 mapCategory)
  value: T; // 當前的 Key (例如 row.category)
}>();
</script>

<template>
  <el-tag :type="map[props.value]?.type ?? 'info'" class="font-bold">
    <el-icon v-if="map[props.value]?.icon" class="mr-1">
      <component :is="map[props.value].icon" />
    </el-icon>
    <span>{{ map[props.value]?.title ?? "" }}</span>
  </el-tag>
</template>
