<template>
  <el-button
    circle
    size="small"
    :type="mapStatus[status as UserStatus].type"
    :icon="mapStatus[status as UserStatus].icon"
    :title="mapStatus[status as UserStatus].title"
  ></el-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  status?: string;
}>();

import type { Component } from "vue";
import type { UserStatus } from "@/types/user";
import { Select, SemiSelect, CloseBold } from "@element-plus/icons-vue";
interface StatusConfig {
  icon: Component;
  type: "success" | "warning" | "danger" | "info";
  title: string;
}
const mapStatus: Record<UserStatus, StatusConfig> = {
  active: {
    icon: Select,
    type: "success",
    title: "active",
  },
  suspended: {
    icon: SemiSelect,
    type: "warning",
    title: "suspended",
  },
  pending: {
    icon: CloseBold,
    type: "danger",
    title: "pending",
  },
};
</script>
