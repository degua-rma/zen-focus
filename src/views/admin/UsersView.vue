<template>
  <div class="users-view">
    <div class="inner-title">
      <h3>用戶管理</h3>
      <div class="flex items-center ml-auto">
        <el-button type="success" :icon="Plus">新增用戶</el-button>
        <el-button type="primary" :icon="Setting">快速管理</el-button>
      </div>
    </div>
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
                style="margin-left: 8px"
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-icon><UserFilled /></el-icon>
                    查看用戶
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="row.status !== 'active'"
                    class="text-success"
                    divided
                  >
                    <el-icon><Select /></el-icon>
                    啟用用戶
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="row.status !== 'suspended'"
                    class="text-warning"
                  >
                    <el-icon><SemiSelect /></el-icon>
                    封存用戶
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="row.status !== 'pending'"
                    class="text-danger"
                  >
                    <el-icon><CloseBold /></el-icon>
                    停用帳號
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <el-icon><Promotion /></el-icon>
                    重設密碼
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-4">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        size="default"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, prev, pager, next, sizes"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
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

import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 用戶資料
const userList = FAKE_DATA.userList;
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return userList.slice(start, start + pageSize.value);
});

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

const pageTotal = computed(() => userList.length);
const handleSizeChange = () => {
  currentPage.value = 1;
};
const handleCurrentChange = () => {};

// 快速對照表
import type { Component } from "vue";
import type { UserStatus } from "@/types/user";
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
