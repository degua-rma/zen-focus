<template>
  <div class="users-view">
    <div class="inner-title">
      <h3>用戶管理</h3>
      <div class="flex items-center ml-auto">
        <el-button type="info" :icon="Download">匯出報表</el-button>
        <el-button type="success" :icon="Plus">新增用戶</el-button>
        <el-button type="warning" :icon="SemiSelect">批次封存</el-button>
        <el-button type="danger" :icon="CloseBold">批次停用</el-button>
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
              <UserStatus :status="row.status" />
            </span>
            <div v-else-if="column.prop === 'action'">
              <UserAction :row="row" />
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
import { Download, Plus, SemiSelect, CloseBold } from "@element-plus/icons-vue";

// components
import TablePage from "@/components/table/TablePage.vue";
import UserStatus from "@/components/table/UserStatus.vue";
import UserAction from "@/components/table/UserAction.vue";

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
</script>
