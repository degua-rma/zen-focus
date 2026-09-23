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
              <MapTag :map="mapCategory" :value="row.category" />
            </div>
            <div v-else-if="column.prop === 'status'">
              <MapTag :map="mapStatus" :value="row.status" />
            </div>
            <div v-else-if="column.prop === 'level'">
              <MapTag :map="mapLevel" :value="row.level" />
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

    <el-drawer v-model="openViewDrawer" direction="rtl" size="50%">
      <template #header>
        <h3>{{ currentLog?.id ?? "" }} 異動詳情</h3>
      </template>
      <template #default>
        <el-descriptions class="mb-4" :column="1" size="small" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">操作人員</div>
            </template>
            <UserCell :user="currentLog?.operator" />
          </el-descriptions-item>
          <el-descriptions-item
            v-for="item in descriptionColumns"
            :key="item.prop"
          >
            <template #label>
              <div class="cell-item">{{ item.label }}</div>
            </template>
            {{ getValue(item.prop) }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="relative">
          <el-button
            type="default"
            size="small"
            :icon="CopyDocument"
            class="copy-btn"
            style="position: absolute; right: 12px; top: 12px"
            @click="copyToClipboard(currentLog?.payload ?? {})"
          >
            複製 JSON
          </el-button>
          <pre
            class="json-code"
          ><code>{{ formattedJson(currentLog?.payload ?? {}) }}</code>
        </pre>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";
import { copyToClipboard } from "@/utils/clipboard";
import { CopyDocument } from "@element-plus/icons-vue";

// components
import MapTag from "@/components/table/MapTag.vue";
import UserCell from "@/components/table/UserCell.vue";
import TablePage from "@/components/table/TablePage.vue";

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

// 對照表
import type { ActionCategory, StatusType, LogLevel } from "@/types/auditLog";
interface StatusConfig {
  title: string;
  type: string;
}
const mapCategory: Record<ActionCategory, StatusConfig> = {
  USER_MGMT: { title: "用戶管理", type: "default" },
  ROLE_PERM: { title: "權限與角色", type: "primary" },
  API_KEY: { title: "API 金鑰", type: "warning" },
  SYSTEM: { title: "系統安全", type: "danger" },
};

const mapStatus: Record<StatusType, StatusConfig> = {
  success: { title: "成功", type: "success" },
  failure: { title: "失敗", type: "danger" },
};

const mapLevel: Record<LogLevel, StatusConfig> = {
  info: { title: "一般", type: "default" },
  warning: { title: "警告", type: "warning" },
  error: { title: "嚴重", type: "danger" },
};

// 開啟查看視窗
import type { AuditLogItem } from "@/types/auditLog";

const openViewDrawer = ref(false);
const currentLog = ref<AuditLogItem | null>(null);
const handleOpenViewLog = (row: AuditLogItem) => {
  openViewDrawer.value = true;
  currentLog.value = row;
};

const formattedJson = (obj: Record<string, any>) => {
  return JSON.stringify(obj, null, 2);
};

const getValue = (key: keyof AuditLogItem) => {
  return currentLog.value?.[key] ?? "";
};

const descriptionColumns = computed(
  () =>
    [
      { prop: "timestamp", label: "操作時間" },
      { prop: "ipAddress", label: "IP 位址" },
      { prop: "location", label: "來源地區" },
      { prop: "action", label: "操作行為" },
      { prop: "description", label: "詳細說明" },
    ] as const,
);
</script>
