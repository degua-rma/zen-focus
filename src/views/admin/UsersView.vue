<template>
  <div class="users-view">
    <div class="inner-title">
      <h3>用戶管理</h3>
      <div class="flex items-center ml-auto">
        <el-button type="success" :icon="Plus">新增用戶</el-button>
        <el-button type="primary" :icon="Setting">快速管理</el-button>
      </div>
    </div>
    <TablePage
      v-model:current-page="currentPage"
      :total="pageTotal"
      @page-change="fetchData"
    >
      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column
          v-for="column in columns"
          :key="column.prop || column.type"
          :type="column.type"
          :index="column.index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :align="column.align"
          :fixed="column.fixed"
        >
          <template #default="{ row }">
            <span v-if="column.prop === 'status'">
              <el-button
                circle
                size="small"
                :type="mapStatus[row.status as UserStatus].type"
                :icon="mapStatus[row.status as UserStatus].icon"
                :title="mapStatus[row.status as UserStatus].title"
              ></el-button>
            </span>
            <div v-else-if="column.prop === 'action'" class="column-action">
              <el-button type="primary" size="small">編輯</el-button>
              <el-dropdown>
                <el-button
                  type="default"
                  :icon="MoreFilled"
                  size="small"
                ></el-button>
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
        </el-table-column>
      </el-table>
    </TablePage>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";
import {
  Plus,
  Setting,
  Select,
  SemiSelect,
  CloseBold,
  MoreFilled,
  UserFilled,
  Promotion,
} from "@element-plus/icons-vue";

// components
import TablePage from "@/components/table/TablePage.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格資料 & 頁碼處理
const allData = FAKE_DATA.userList;
const pageTotal = computed(() => allData.length);
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return allData.slice(start, start + pageSize.value);
});

// 切換頁碼時呼叫
const fetchData = (page: number, size: number) => {
  console.log("重新載入資料:", { page, size });
  // 呼叫 API 重新載入列表...
};

// 表格欄位
const columns = computed(() => [
  {
    type: "index",
    index: (index: number) =>
      (currentPage.value - 1) * pageSize.value + index + 1,
    label: "項次",
    width: 60,
    fixed: "left",
    align: "center",
  },
  {
    prop: "id",
    label: "編號",
    width: 100,
    fixed: "left",
    align: "center",
  },
  {
    prop: "name",
    label: "使用者名稱",
    width: 140,
    fixed: "left",
  },
  {
    prop: "email",
    label: "信箱",
    width: 200,
  },
  {
    prop: "role",
    label: "角色",
    width: 140,
  },
  {
    prop: "department",
    label: "部門",
    width: 140,
  },
  {
    prop: "createdAt",
    label: "建立時間",
    width: 140,
  },
  {
    prop: "status",
    label: "狀態",
    width: 60,
    align: "center",
    fixed: "right",
  },
  {
    prop: "action",
    label: "操作",
    width: 140,
    align: "center",
    fixed: "right",
  },
]);

// 快速對照表
import type { Component } from "vue";
import type { UserStatus, UserItem } from "@/types/user";
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
