export type StatusType = "success" | "failure";
export type LogLevel = "info" | "warning" | "error";
export type ActionCategory = "USER_MGMT" | "ROLE_PERM" | "API_KEY" | "SYSTEM";

export interface AuditLogItem {
  id: string;
  timestamp: string;
  operator: {
    name: string;
    email: string;
    avatar?: string;
  };
  category: ActionCategory;
  action: string;
  description: string;
  ipAddress: string;
  location: string;
  status: StatusType;
  level: LogLevel;
  payload?: Record<string, any>; // 詳細的操作細節，供 Drawer/Modal 檢視
}
