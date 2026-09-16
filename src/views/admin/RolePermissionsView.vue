<template>
  <div class="role-permissions-view">
    <div class="inner-title">
      <h3>權限管理</h3>
      <div class="flex items-center ml-auto">
        <el-button type="success" :icon="Plus">新增自訂角色</el-button>
      </div>
    </div>
    <el-table :data="tableData" border :height="tableHeight">
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align"
        :fixed="column.fixed"
      >
        <template #default="{ row }">
          <div v-if="column.prop === 'type'">
            <el-tag v-if="row.isSystem" type="info">預設</el-tag>
            <el-tag v-else type="warning">自訂</el-tag>
          </div>
          <div v-else-if="column.prop === 'scope'" class="pl-2 pr-2">
            <el-tag v-for="item in row.scope" :key="row.id + item" class="m-1">
              {{ item }}
            </el-tag>
          </div>
          <div v-else-if="column.prop === 'action'" class="column-action">
            <el-button
              type="default"
              size="small"
              @click="handleOpenViewPermission(row)"
            >
              查看
            </el-button>
            <el-button v-if="!row.isSystem" type="primary" size="small">
              編輯
            </el-button>
            <el-button v-if="!row.isSystem" type="danger" size="small">
              刪除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看權限清單 -->
    <el-drawer v-model="openViewPermissionDrawer" direction="rtl">
      <template #header>
        <h3>{{ currentRole?.role ?? "" }} 權限列表</h3>
      </template>
      <template #default>
        <div
          v-for="category in permissionList"
          :key="category.category"
          class="mb-4"
        >
          <h4 class="mb-2">{{ category.categoryName }}</h4>
          <el-tag
            v-for="item in category.items"
            :key="item.code"
            :type="hasPermission(item.code) ? 'primary' : 'info'"
            :effect="hasPermission(item.code) ? 'dark' : 'light'"
            class="m-1"
          >
            <div class="flex items-center">
              <span class="mr-1">{{ `${item.code} (${item.name})` }}</span>
              <el-tooltip class="box-item" effect="dark" placement="top-start">
                <template #content>
                  {{ item.description }}
                </template>
                <el-icon class="hover-icon"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </el-tag>
        </div>
      </template>
      <template #footer></template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSettingStore } from "@/store/setting";
import { Plus, QuestionFilled } from "@element-plus/icons-vue";
import { FAKE_DATA } from "@/mock/fake-data";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 180);

// 表格資料
const tableData = FAKE_DATA.roleList;

// 表格欄位
const columns = computed(() => [
  {
    prop: "id",
    label: "編號",
    width: 100,
    align: "center",
  },
  {
    prop: "role",
    label: "角色",
    width: 120,
  },
  {
    prop: "type",
    label: "類型",
    align: "center",
    width: 80,
  },
  {
    prop: "description",
    label: "權限簡述",
    width: 400,
  },
  {
    prop: "createdAt",
    label: "建立時間",
    width: 100,
  },
  {
    prop: "action",
    label: "操作",
    width: 180,
    align: "center",
  },
]);

// 權限列表
const permissionList = FAKE_DATA.permissionList;

// 開啟查看視窗
import type { RoleItem } from "@/types/role";

const openViewPermissionDrawer = ref(false);
const currentRole = ref<RoleItem | null>(null);

const handleOpenViewPermission = (row: RoleItem) => {
  openViewPermissionDrawer.value = true;
  currentRole.value = row;
};
// 判斷角色是否擁有該權限
const hasPermission = (code: string): boolean => {
  return currentRole.value?.scope?.includes(code) ?? false;
};
</script>
