<template>
  <div class="api-key-view">
    <div class="inner-title">
      <h3>API管理</h3>
      <div class="flex items-center ml-auto">
        <el-button type="success" :icon="Plus">新增金鑰</el-button>
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
            <div v-if="column.prop === 'name'">
              <h6>{{ row.name }}</h6>
              <p>
                <a @click="handleCopyKey(row)" title="複製金鑰前綴">
                  {{ row.keyPrefix }}
                  <el-icon class="ml-1"><CopyDocument /></el-icon>
                </a>
              </p>
            </div>
            <div v-else-if="column.prop === 'creator'">
              <UserCell :user="row.creator" />
            </div>
            <div v-else-if="column.prop === 'scopes'">
              <el-tooltip
                v-if="row.scopes.length > 2"
                placement="top"
                effect="dark"
              >
                <template #content>
                  <div class="flex flex-col gap-1">
                    <span v-for="scope in row.scopes" :key="scope">
                      {{ scope }}
                    </span>
                  </div>
                </template>
                <el-tag type="primary" class="cursor-pointer">
                  +{{ row.scopes.length - 2 }}
                </el-tag>
              </el-tooltip>
              <el-tag v-else v-for="item in row.scopes" type="info" class="m-1">
                {{ item }}
              </el-tag>
            </div>
            <div v-else-if="column.prop === 'status'">
              <MapTag :map="mapKeyStatus" :value="row.status" />
            </div>
            <div
              v-else-if="column.prop === 'action'"
              class="column-action full"
            >
              <span v-if="row.status !== 'active'">-</span>
              <el-button
                v-else
                v-for="item in ShowActionMenu(row)"
                :key="item.title"
                :type="item.type"
                :icon="item.icon"
                size="small"
                class="full-btn"
                @click="item.onClick"
              >
                {{ item.title }}
              </el-button>
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
  CopyDocument,
  Refresh,
  CircleClose,
  Plus,
} from "@element-plus/icons-vue";

// components
import MapTag from "@/components/table/MapTag.vue";
import UserCell from "@/components/table/UserCell.vue";
import TablePage from "@/components/table/TablePage.vue";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格資料 & 頁碼處理
const allData = FAKE_DATA.mockApiKeys;
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
    label: "編號",
    width: 100,
    fixed: "left",
    align: "center",
  },
  {
    prop: "name",
    label: "金鑰名稱與前綴",
    width: 240,
  },
  {
    prop: "scopes",
    label: "權限範圍",
    width: 160,
    align: "center",
  },
  {
    prop: "creator",
    label: "建立者",
    width: 160,
  },
  {
    prop: "status",
    label: "狀態",
    width: 100,
    align: "center",
  },
  {
    prop: "lastUsedAt",
    label: "最後使用時間",
    width: 120,
    align: "center",
  },
  {
    prop: "createdAt",
    label: "建立時間",
    width: 120,
    align: "center",
  },
  {
    prop: "expiresAt",
    label: "到期日",
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
import type { ApiKeyStatus, ApiKeyItem } from "@/types/apiKey";
interface StatusConfig {
  title: string;
  type: string;
}
const mapKeyStatus: Record<ApiKeyStatus, StatusConfig> = {
  active: { title: "啟用中", type: "success" },
  revoked: { title: "已撤銷", type: "danger" },
  expired: { title: "已過期", type: "info" },
};

const ActionMenu = (row: ApiKeyItem) => [
  {
    title: "重新產生",
    icon: Refresh,
    show: row.status === "active",
    type: "warning",
    onClick: () => handleRegenerateKey(row),
  },
  {
    title: "撤銷金鑰",
    icon: CircleClose,
    show: row.status === "active",
    type: "danger",
    onClick: () => handleRevokeKey(row),
  },
];

const ShowActionMenu = (row: ApiKeyItem) =>
  ActionMenu(row).filter((item) => item.show);

const handleCopyKey = (row: ApiKeyItem) => {};
const handleRegenerateKey = (row: ApiKeyItem) => {};
const handleRevokeKey = (row: ApiKeyItem) => {};
</script>
