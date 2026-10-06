<script setup lang="ts">
import type { TagProps } from "element-plus";
import type { Component } from "vue";

interface TagConfig {
  title: string;
  type?: TagProps["type"] | (string & {});
  icon?: Component;
}

defineProps<{
  map: Record<string | number | symbol, TagConfig>;
  value?: string | number | symbol | null;
}>();

const getTagType = (type?: string): TagProps["type"] => {
  const validTypes = ["primary", "success", "info", "warning", "danger"];
  return validTypes.includes(type ?? "") ? (type as TagProps["type"]) : "info";
};
</script>

<template>
  <el-tag
    v-if="value != null && map[value]"
    :type="getTagType(map[value].type)"
    class="font-bold"
  >
    <el-icon v-if="map[value].icon" class="mr-1">
      <component :is="map[value].icon" />
    </el-icon>
    <span>{{ map[value].title ?? "" }}</span>
  </el-tag>
</template>
