<template>
  <div class="column-action">
    <el-button type="primary" size="small">編輯</el-button>
    <el-dropdown>
      <el-button type="default" :icon="MoreFilled" size="small"></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in ShowActionMenu(row)"
            :key="item.title"
            :class="item.class"
            :divided="item.divided"
            @click="item.onClick"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { UserItem } from "@/types/user";
const props = defineProps<{
  row: UserItem;
}>();
import {
  Select,
  SemiSelect,
  CloseBold,
  MoreFilled,
  UserFilled,
  Promotion,
} from "@element-plus/icons-vue";

const ActionMenu = (row: UserItem) => {
  return [
    {
      title: "查看用戶",
      icon: UserFilled,
      show: true,
      onClick: () => handleViewUser(row),
    },
    {
      title: "啟用用戶",
      icon: Select,
      show: row.status !== "active",
      class: "text-success",
      onClick: () => handleActiveUser(row),
    },
    {
      title: "封存用戶",
      icon: SemiSelect,
      show: row.status !== "suspended",
      class: "text-warning",
      onClick: () => handleSuspendedUser(row),
    },
    {
      title: "停用帳號",
      icon: CloseBold,
      show: row.status !== "pending",
      class: "text-danger",
      onClick: () => handlePendingUser(row),
    },
    {
      title: "重設密碼",
      icon: Promotion,
      show: true,
      divided: true,
      onClick: () => handleResetPassword(row),
    },
  ];
};

const ShowActionMenu = (row: UserItem) => {
  return ActionMenu(row).filter((item) => item.show);
};

const handleViewUser = (row: UserItem) => {};
const handleActiveUser = (row: UserItem) => {};
const handleSuspendedUser = (row: UserItem) => {};
const handlePendingUser = (row: UserItem) => {};
const handleResetPassword = (row: UserItem) => {};
</script>
