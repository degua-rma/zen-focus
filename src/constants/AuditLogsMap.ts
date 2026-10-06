import type { ActionCategory, StatusType, LogLevel } from "@/types/auditLog";
interface StatusConfig {
  title: string;
  type: string;
}

export const MAP_CATEGORY: Record<ActionCategory, StatusConfig> = {
  USER_MGMT: { title: "用戶管理", type: "default" },
  ROLE_PERM: { title: "權限與角色", type: "primary" },
  API_KEY: { title: "API 金鑰", type: "warning" },
  SYSTEM: { title: "系統安全", type: "danger" },
};

export const MAP_STATUS: Record<StatusType, StatusConfig> = {
  success: { title: "成功", type: "success" },
  failure: { title: "失敗", type: "danger" },
};

export const MAP_LEVEL: Record<LogLevel, StatusConfig> = {
  info: { title: "一般", type: "default" },
  warning: { title: "警告", type: "warning" },
  error: { title: "嚴重", type: "danger" },
};
