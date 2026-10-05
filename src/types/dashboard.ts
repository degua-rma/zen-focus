// API 調用量與系統延遲趨勢圖型別
export interface ApiTrendPoint {
  time: string; // 時間節點 (例: "00:00")
  requests: number; // API 呼叫次數
  latency: number; // 系統延遲時間 (ms)
}

// 裝置與登入型態分佈圖型別
export interface DeviceDistributionItem {
  name: string; // 裝置/類型名稱
  value: number; // 百分比或數量
}

// 專案進度項目型別
export interface ProjectProgressItem {
  id: string;
  stage: string; // 階段標題
  status: "completed" | "in_progress" | "pending";
}

// 頂部 KPI 卡片資料型別
export interface DashboardKpi {
  totalUsers: number;
  userGrowthRate: number;
  systemStatus: "normal" | "warning" | "error";
  systemUptimePercentage: number;
  apiRequestsCount: string;
  apiSuccessRate: number;
  unresolvedAlertsCount: number;
  alertLevel: "low" | "medium" | "high";
}
