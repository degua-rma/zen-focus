<template>
  <div class="home-view">
    <div class="dashboard-header">
      <div class="card-space small">
        <h4>總用戶 / 活躍數</h4>
        <p>
          {{ dashboardKpi.totalUsers }} 人
          <span class="text-success font-bold"
            >({{ dashboardKpi.userGrowthRate > 0 ? "+" : ""
            }}{{ dashboardKpi.userGrowthRate }}%)
          </span>
        </p>
      </div>
      <div class="card-space small">
        <h4>系統運作狀態</h4>
        <p>
          {{ dashboardKpi.systemUptimePercentage }}%
          <span
            v-if="dashboardKpi.systemStatus === 'normal'"
            class="text-success font-bold"
          >
            (正常)
          </span>
          <span
            v-else-if="dashboardKpi.systemStatus === 'warning'"
            class="text-warning font-bold"
          >
            (注意)
          </span>
          <span v-else class="text-danger font-bold"> (危險) </span>
        </p>
      </div>
      <div class="card-space small">
        <h4>API 呼叫量 / 成功率</h4>
        <p>
          {{ dashboardKpi.apiRequestsCount }} 次
          <span class="text-success font-bold">
            ({{ dashboardKpi.apiSuccessRate }}%)
          </span>
        </p>
      </div>
      <div class="card-space small">
        <h4>未處理資安告警</h4>
        <p>
          {{ dashboardKpi.unresolvedAlertsCount }} 件
          <span
            v-if="dashboardKpi.alertLevel === 'low'"
            class="text-success font-bold"
          >
            (低風險)
          </span>
          <span
            v-else-if="dashboardKpi.alertLevel === 'medium'"
            class="text-warning font-bold"
          >
            (中/高風險)
          </span>
          <span v-else class="text-danger font-bold">(高風險)</span>
        </p>
      </div>
    </div>
    <div class="dashboard-chart">
      <div class="card-space large">
        <h3>API 調用量與系統延遲 (近 24 小時)</h3>
        <div class="chart-container">
          <v-chart class="chart" :option="apiTrendOption" autoresize />
        </div>
      </div>
      <div class="card-space large">
        <h3>裝置與登入型態分佈</h3>
        <div class="chart-container">
          <v-chart class="chart" :option="deviceOption" autoresize />
        </div>
      </div>
    </div>
    <div class="dashboard-log">
      <div class="card-space large">
        <h4>最新審計與存取日誌</h4>
        <el-table :data="auditLogsData" border size="small">
          <el-table-column
            v-for="column in auditLogsColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :align="column.align"
          >
            <template #default="{ row }">
              <div v-if="column.prop === 'operator'">
                {{ row.operator.name }}
              </div>
              <div v-else-if="column.prop === 'view'">
                <el-button size="small" @click="handleOpenViewLog(row)">
                  詳情
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-center mt-2">
          <el-button type="primary" size="small" @click="goToAuditLogs"
            >查看所有紀錄</el-button
          >
        </div>
      </div>
      <div class="card-space large">
        <h4>Zen Focus 專案進度</h4>
        <ul>
          <li
            v-for="item in progectProgressList"
            class="flex items-center gap-2 pb-2"
          >
            <el-tag
              v-if="item.status === 'completed'"
              type="success"
              class="font-bold"
            >
              已完成
            </el-tag>
            <el-tag v-else-if="item.status === 'in_progress'">進行中</el-tag>
            <el-tag v-else type="info">暫停中</el-tag>
            <p>{{ item.stage }}</p>
          </li>
        </ul>
      </div>
      <AuditLogDetailDrawer
        v-model="openAuditLogDrawer"
        :log-data="currentLog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FAKE_DATA } from "@/mock/fake-data";

// components
import AuditLogDetailDrawer from "@/components/overlays/AuditLogDetailDrawer.vue";

// 圖表相關
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const dashboardKpi = FAKE_DATA.mockDashboardKpi;
const apiTrendChartData = FAKE_DATA.mockApiTrendData;
const deviceChartData = FAKE_DATA.mockDeviceDistribution;
const progectProgressList = FAKE_DATA.mockProjectProgress;

const colorPrimary = "#5b92f8";
const colorSuccess = "#0acb5e";
const colorWarning = "#ffbf00";
const colorInfo = "#cbcbcb";
const CHART_COLORS = [colorPrimary, colorSuccess, colorWarning, colorInfo];

const apiTrendOption = ref({
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    textStyle: { color: "#1F2937", fontSize: 13 },
    padding: [10, 14],
    extraCssText:
      "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 8px;",
  },
  legend: {
    bottom: "2%",
    left: "center",
    icon: "circle",
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 24,
    textStyle: { color: "#6B7280", fontSize: 12 },
  },
  grid: {
    top: "15%",
    left: "8%",
    right: "12%",
    bottom: "25%",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: apiTrendChartData.map((item) => item.time),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: "#9CA3AF", fontSize: 12, margin: 12 },
  },
  yAxis: [
    {
      type: "value",
      name: "呼叫量",
      nameTextStyle: { color: "#9CA3AF", padding: [0, 24, 0, 0] },
      axisLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        formatter: (val: number) => (val >= 1000 ? `${val / 1000}k` : val),
      },
      splitLine: {
        lineStyle: { type: "dashed", color: "#F3F4F6" },
      },
    },
    {
      type: "value",
      name: "延遲 (ms)",
      nameTextStyle: { color: "#9CA3AF", padding: [0, 0, 0, 24] },
      axisLabel: { color: "#9CA3AF", fontSize: 11, formatter: "{value} ms" },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: "呼叫量 (Requests)",
      type: "line",
      smooth: 0.4,
      showSymbol: false,
      symbolSize: 6,
      itemStyle: { color: colorPrimary },
      lineStyle: { width: 3, color: colorPrimary },
      data: apiTrendChartData.map((item) => item.requests),
    },
    {
      name: "延遲 (Latency)",
      type: "line",
      yAxisIndex: 1,
      smooth: 0.4,
      showSymbol: false,
      symbolSize: 6,
      itemStyle: { color: colorWarning },
      lineStyle: { width: 2.5, color: colorWarning },
      data: apiTrendChartData.map((item) => item.latency),
    },
  ],
});

const deviceOption = ref({
  color: CHART_COLORS,
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    textStyle: { color: "#1F2937", fontSize: 13 },
    padding: [10, 14],
    extraCssText:
      "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 8px;",
    formatter: (params: any) => {
      return `
      <div class="flex items-center">
        <span>${params.marker}</span>
        <span>${params.name}:</span>
        <span class="font-bold ml-1">${params.value}%</span>
      </div>
    `;
    },
  },
  legend: {
    orient: "vertical",
    right: "5%",
    top: "center",
    icon: "circle",
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 16,
    textStyle: { color: "#6B7280", fontSize: 12 },
  },
  series: [
    {
      name: "裝置分佈",
      type: "pie",
      radius: ["45%", "75%"],
      center: ["35%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: "#fff",
        borderWidth: 2,
      },
      emphasis: {
        scale: true,
        scaleSize: 5,
      },
      label: {
        show: false,
      },
      data: deviceChartData,
    },
  ],
});

// 最新審計日誌
const auditLogsData = FAKE_DATA.mockAuditLogs.slice(0, 3);
const auditLogsColumns = computed(() => [
  {
    prop: "timestamp",
    label: "操作時間",
    width: 80,
  },
  {
    prop: "operator",
    label: "操作人員",
    width: 80,
  },
  {
    prop: "description",
    label: "詳細說明",
    width: 240,
  },
  {
    prop: "view",
    label: "查看",
    width: 80,
    align: "center",
  },
]);

// 開啟查看視窗
import type { AuditLogItem } from "@/types/auditLog";

const openAuditLogDrawer = ref(false);
const currentLog = ref<AuditLogItem | null>(null);
const handleOpenViewLog = (row: AuditLogItem) => {
  openAuditLogDrawer.value = true;
  currentLog.value = row;
};

// 頁面跳轉
import { useRouter } from "vue-router";

const router = useRouter();
const goToAuditLogs = () => {
  router.push({ name: "audit-logs" });
};
</script>

<style scoped lang="scss">
.dashboard-header,
.dashboard-chart,
.dashboard-log {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 16px;
  .card-space {
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    h3,
    h4 {
      text-align: center;
      margin-bottom: 8px;
    }
    &.small {
      width: 25%;
    }
    &.large {
      width: 50%;
    }
    &:not(:last-child) {
      border-right: 1px dashed #ddd;
    }
    ul {
      li {
        margin-bottom: 4px;
      }
    }
  }
}
.dashboard-header {
  p {
    text-align: center;
  }
}
.dashboard-chart {
  .chart-container {
    width: 100%;
    height: 240px;
    border: 1px solid #ddd;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
.dashboard-log {
  margin-bottom: 0;
}
</style>
