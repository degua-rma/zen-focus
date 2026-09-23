<template>
  <div class="active-sessions-view">
    <div class="inner-title">
      <h3>活動階段與裝置管理</h3>
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
            <div v-if="column.prop === 'id'">
              <el-tag
                v-if="row.isCurrent"
                type="primary"
                class="font-bold mr-1"
              >
                當前裝置
              </el-tag>
              <MapTag :map="mapSessionStatus" :value="row.status" />
              <p>{{ row.id }}</p>
            </div>
            <div v-else-if="column.prop === 'user'">
              <UserCell :user="row.user" />
            </div>
            <div v-else-if="column.prop === 'deviceType'">
              <MapTag :map="mapDeviceType" :value="row.deviceType" />
            </div>
            <div v-else-if="column.prop === 'action'">
              <el-button v-if="!row.isCurrent" size="small" type="danger">
                強制剔除
              </el-button>
              <span v-else>-</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </TablePage>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from "vue";
import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";
import { Monitor, Iphone } from "@element-plus/icons-vue";

// components
import MapTag from "@/components/table/MapTag.vue";
import UserCell from "@/components/table/UserCell.vue";
import TablePage from "@/components/table/TablePage.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格資料 & 頁碼處理
const allData = FAKE_DATA.mockUserSessions;
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
    label: "編號與裝置狀態",
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
    prop: "deviceType",
    label: "裝置類型",
    width: 120,
    align: "center",
  },
  {
    prop: "deviceName",
    label: "裝置與系統",
    width: 160,
    align: "center",
  },
  {
    prop: "browser",
    label: "瀏覽器",
    width: 160,
  },
  {
    prop: "os",
    label: "作業系統",
    width: 160,
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
    prop: "lastActiveTime",
    label: "最後活動時間",
    width: 120,
    align: "center",
  },
  {
    prop: "action",
    label: "操作",
    width: 140,
    align: "center",
    fixed: "right",
  },
]);

// 對照表
import type { DeviceType, SessionStatus } from "@/types/session";
interface StatusConfig {
  title: string;
  type: string;
  icon?: Component;
}
const mapDeviceType: Record<DeviceType, StatusConfig> = {
  desktop: { title: "桌機", type: "primary", icon: Monitor },
  mobile: { title: "行動裝置", type: "warning", icon: Iphone },
};

const mapSessionStatus: Record<SessionStatus, StatusConfig> = {
  active: { title: "線上", type: "success" },
  idle: { title: "閒置", type: "info" },
  risk: { title: "高風險", type: "danger" },
};
</script>
