<template>
  <div class="login-logs-view">
    <div class="inner-title">
      <h3>存取與登入紀錄</h3>
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
            <div v-if="column.prop === 'user'">
              <UserCell :user="row.user" />
            </div>
            <div v-else-if="column.prop === 'status'">
              <MapTag :map="mapStatus" :value="row.status" />
            </div>
            <div v-else-if="column.prop === 'twoFactorStatus'">
              <MapTag :map="mapTwoFactor" :value="row.twoFactorStatus" />
            </div>
            <div v-else-if="column.prop === 'riskTags'">
              <MapTag
                v-for="item in row.riskTags"
                :map="mapRisk"
                :value="item"
                class="m-1"
              />
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
import UserCell from "@/components/table/UserCell.vue";
import TablePage from "@/components/table/TablePage.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格資料 & 頁碼處理
const allData = FAKE_DATA.mockAccessLogs;
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
    label: "紀錄編號",
    width: 160,
    fixed: "left",
    align: "center",
  },
  {
    prop: "user",
    label: "使用者資訊",
    width: 160,
  },
  {
    prop: "loginTime",
    label: "登入時間",
    width: 160,
  },
  {
    prop: "status",
    label: "登入狀態",
    width: 100,
    align: "center",
  },
  {
    prop: "ipAddress",
    label: "IP 位址",
    width: 160,
  },
  {
    prop: "location",
    label: "地理位置",
    width: 160,
  },
  {
    prop: "browser",
    label: "瀏覽器類型",
    width: 160,
  },
  {
    prop: "os",
    label: "作業系統",
    width: 160,
  },
  {
    prop: "userAgent",
    label: "用戶代理字串",
    width: 400,
  },
  {
    prop: "twoFactorStatus",
    label: "雙重驗證 (2FA) 狀態",
    width: 160,
    align: "center",
  },
  {
    prop: "riskTags",
    label: "異常風險標籤",
    width: 140,
    align: "center",
  },
]);

// 對照表
import type {
  StatusType,
  twoFactorStatusType,
  RiskTagType,
} from "@/types/accessLog";
interface StatusConfig {
  title: string;
  type: string;
}

const mapStatus: Record<StatusType, StatusConfig> = {
  SUCCESS: { title: "成功", type: "success" },
  FAILED: { title: "失敗", type: "danger" },
};

const mapTwoFactor: Record<twoFactorStatusType, StatusConfig> = {
  PASSED: { title: "已通過", type: "success" },
  SKIPPED: { title: "已跳過", type: "info" },
  FAILED: { title: "驗證失敗", type: "danger" },
  NOT_ENABLED: { title: "未啟用", type: "default" },
};

const mapRisk: Record<RiskTagType, StatusConfig> = {
  UNUSUAL_LOCATION: { title: "異地登入", type: "warning" },
  BRUTE_FORCE_ALERT: { title: "暴力破解警告", type: "danger" },
  NEW_DEVICE: { title: "新裝置登入", type: "success" },
};
</script>
