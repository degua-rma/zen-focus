<template>
  <div class="audit-logs-view">
    <div class="inner-title">
      <h3>審計日誌</h3>
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
            <div v-if="column.prop === 'operator'">
              <UserCell :user="row.operator" />
            </div>
            <div v-else-if="column.prop === 'category'">
              <MapTag :map="MAP_CATEGORY" :value="row.category" />
            </div>
            <div v-else-if="column.prop === 'status'">
              <MapTag :map="MAP_STATUS" :value="row.status" />
            </div>
            <div v-else-if="column.prop === 'level'">
              <MapTag :map="MAP_LEVEL" :value="row.level" />
            </div>
            <div v-else-if="column.prop === 'payload'">
              <el-button size="small" @click="handleOpenViewLog(row)">
                查看詳情
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </TablePage>
    <AuditLogDetailDrawer v-model="openViewDrawer" :log-data="currentLog" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";

// 對照表
import { MAP_CATEGORY, MAP_STATUS, MAP_LEVEL } from "@/constants/AuditLogsMap";

// components
import MapTag from "@/components/table/MapTag.vue";
import UserCell from "@/components/table/UserCell.vue";
import TablePage from "@/components/table/TablePage.vue";
import AuditLogDetailDrawer from "@/components/overlays/AuditLogDetailDrawer.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格資料 & 頁碼處理
const allData = FAKE_DATA.mockAuditLogs;
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
    label: "日誌編號",
    width: 160,
    fixed: "left",
    align: "center",
  },
  {
    prop: "timestamp",
    label: "操作時間",
    width: 160,
  },
  {
    prop: "operator",
    label: "操作人員",
    width: 160,
  },
  {
    prop: "category",
    label: "事件分類",
    width: 120,
    align: "center",
  },
  {
    prop: "action",
    label: "操作行為",
    width: 160,
  },
  {
    prop: "description",
    label: "詳細說明",
    width: 240,
  },
  {
    prop: "ipAddress",
    label: "IP 位址",
    width: 160,
  },
  {
    prop: "location",
    label: "來源地區",
    width: 200,
  },
  {
    prop: "status",
    label: "執行狀態",
    width: 100,
    align: "center",
  },
  {
    prop: "level",
    label: "風險等級",
    width: 100,
    align: "center",
  },
  {
    prop: "payload",
    label: "異動詳情",
    width: 100,
    align: "center",
    fixed: "right",
  },
]);

// 開啟查看視窗
import type { AuditLogItem } from "@/types/auditLog";

const openViewDrawer = ref(false);
const currentLog = ref<AuditLogItem | null>(null);
const handleOpenViewLog = (row: AuditLogItem) => {
  openViewDrawer.value = true;
  currentLog.value = row;
};
</script>
