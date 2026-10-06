import type {
  ApiTrendPoint,
  DeviceDistributionItem,
  ProjectProgressItem,
  DashboardKpi,
} from "@/types/dashboard";

// 1. 頂部 KPI 數據
export const mockDashboardKpi: DashboardKpi = {
  totalUsers: 1280,
  userGrowthRate: 12, // +12%
  systemStatus: "normal",
  systemUptimePercentage: 99.9,
  apiRequestsCount: "1.2M",
  apiSuccessRate: 99.8,
  unresolvedAlertsCount: 2,
  alertLevel: "medium",
};

// 2. 左圖：API 調用量與系統延遲 (近 24 小時)
export const mockApiTrendData: ApiTrendPoint[] = [
  { time: "00:00", requests: 12500, latency: 42 },
  { time: "03:00", requests: 8200, latency: 38 },
  { time: "06:00", requests: 15400, latency: 45 },
  { time: "09:00", requests: 48200, latency: 88 },
  { time: "12:00", requests: 62100, latency: 110 },
  { time: "15:00", requests: 59800, latency: 95 },
  { time: "18:00", requests: 34100, latency: 62 },
  { time: "21:00", requests: 21300, latency: 49 },
];

// 3. 右圖：裝置與登入型態分佈
export const mockDeviceDistribution: DeviceDistributionItem[] = [
  { name: "Desktop (Mac / Windows)", value: 68 },
  { name: "Mobile (iOS / Android)", value: 22 },
  { name: "API Client (Postman/SDK)", value: 7 },
  { name: "其他 / 未知裝置", value: 3 },
];

// 4. 右下：Zen Focus 專案進度
export const mockProjectProgress: ProjectProgressItem[] = [
  {
    id: "stage-1",
    stage: "第一階段：全站視覺基礎 UI 與元件模組化",
    status: "completed",
  },
  {
    id: "stage-2",
    stage: "第二階段：儀表板數據卡片、圖表與統計資訊",
    status: "completed",
  },
  {
    id: "stage-3",
    stage: "第三階段：全站彈出視窗互動、表單驗證，以及登入頁互動",
    status: "in_progress",
  },
  {
    id: "stage-4",
    stage: "第四階段：搜尋、進階篩選",
    status: "in_progress",
  },
  {
    id: "stage-5",
    stage: "第五階段：頁面翻譯與多國語系細節",
    status: "in_progress",
  },
];
