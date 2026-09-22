<template>
  <div class="api-logs-view">
    <div class="inner-title">
      <h3>API調用紀錄</h3>
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
            <div v-if="column.prop === 'method'">
              <MapTag :map="mapMethod" :value="row.method" />
            </div>
            <div v-else-if="column.prop === 'statusCode'">
              <MapTag :map="mapStatus" :value="row.statusCode" />
            </div>
            <div v-else-if="column.prop === 'responseTime'">
              {{ row.responseTime }} ms
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

// components
import MapTag from "@/components/table/MapTag.vue";
import TablePage from "@/components/table/TablePage.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格資料 & 頁碼處理
const allData = FAKE_DATA.mockApiLogs;
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
    label: "請求編號",
    width: 160,
    fixed: "left",
    align: "center",
  },
  {
    prop: "timestamp",
    label: "請求時間",
    width: 160,
  },
  {
    prop: "method",
    label: "HTTP 請求方法",
    width: 140,
    align: "center",
  },
  {
    prop: "path",
    label: "API 路徑",
    width: 240,
  },
  {
    prop: "statusCode",
    label: "HTTP 狀態碼",
    width: 160,
    align: "center",
  },
  {
    prop: "responseTime",
    label: "響應時間",
    width: 100,
    align: "center",
  },
  {
    prop: "apiKeyName",
    label: "API 金鑰名稱",
    width: 240,
  },
  {
    prop: "apiKeyPrefix",
    label: "金鑰前綴",
    width: 160,
  },
  {
    prop: "ipAddress",
    label: "來源 IP",
    width: 160,
  },
]);

// 對照表
import type { HttpMethod, HttpStatus } from "@/types/apiLog";
interface StatusConfig {
  title: string;
  type: string;
}

const mapMethod: Record<HttpMethod, StatusConfig> = {
  GET: { title: "GET", type: "info" },
  POST: { title: "POST", type: "success" },
  PUT: { title: "PUT", type: "warning" },
  DELETE: { title: "DELETE", type: "danger" },
  PATCH: { title: "PATCH", type: "warning" },
};

const mapStatus: Record<HttpStatus, StatusConfig> = {
  200: { title: "200 OK", type: "success" },
  201: { title: "201 Created", type: "success" },
  400: { title: "400 Bad Request", type: "warning" },
  401: { title: "401 Unauthorized", type: "warning" },
  403: { title: "403 Forbidden", type: "danger" },
  404: { title: "404 Not Found", type: "info" },
  500: { title: "500 Server Error", type: "danger" },
  502: { title: "502 Bad Gateway", type: "danger" },
};
</script>
