<template>
  <div class="payment-setting-view">
    <div class="inner-title">
      <h3>繳費提醒</h3>
      <el-tooltip class="box-item" effect="dark" placement="bottom-start">
        <template #content>
          可以在這裡設定每月/每兩個月/每季/每半年/每年繳費的項目，<br />
          也可以依照繳費週期個別設定提醒，<br />
          繳費前數天(可自行設定)以e-mail提醒。<br />
          預設自動帶入使用者登入的e-mail或gmail信箱。
        </template>
        <el-icon class="hover-icon"><QuestionFilled /></el-icon>
      </el-tooltip>
      <div class="flex items-center ml-auto">
        <el-button type="success" :icon="Plus">新增項目</el-button>
        <el-button type="primary" :icon="Bell">提醒設定</el-button>
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
          <span v-if="column.prop === 'status'">
            <el-tag v-if="row.status" type="success">已繳清</el-tag>
            <el-tag v-else type="info">未繳費</el-tag>
          </span>
          <div v-else-if="column.prop === 'action'" class="column-action">
            <el-button type="primary" size="small">編輯</el-button>
            <el-button type="danger" size="small">刪除</el-button>
          </div>
          <span v-else>{{ row[column.prop] }}</span>
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
import { QuestionFilled, Bell, Plus } from "@element-plus/icons-vue";
import { FAKE_DATA } from "@/mock/fake-data";
import { useSettingStore } from "@/store/setting";

// 取得視窗高度並計算表格高度
const settingStore = useSettingStore();
const tableHeight = computed(() => settingStore.domHeight - 232);

// 表格欄位
const columns = computed(() => [
  {
    prop: "id",
    label: "編號",
    width: 60,
    fixed: "left",
    align: "center",
  },
  {
    prop: "name",
    label: "名稱",
    width: 140,
    fixed: "left",
  },
  {
    prop: "status",
    label: "狀態",
    width: 80,
    align: "center",
  },
  {
    prop: "amount",
    label: "金額",
    width: 80,
    align: "center",
  },
  {
    prop: "period",
    label: "繳費週期",
    width: 100,
    align: "center",
  },
  {
    prop: "date",
    label: "繳費日期",
    width: 120,
    align: "center",
  },
  {
    prop: "lastPaymentDate",
    label: "上次繳費日",
    width: 120,
    align: "center",
  },
  {
    prop: "note",
    label: "備註",
    width: 300,
  },
  {
    prop: "action",
    label: "操作",
    width: 140,
    align: "center",
    fixed: "right",
  },
]);

const allData = FAKE_DATA.paymentSettingData;
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return allData.slice(start, start + pageSize.value);
});
const pageTotal = computed(() => allData.length);
const handleSizeChange = () => {
  currentPage.value = 1;
};
const handleCurrentChange = () => {};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 8px;
}
</style>
