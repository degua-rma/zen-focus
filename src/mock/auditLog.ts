import type { AuditLogItem } from "@/types/auditLog";

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: "LOG-20260918-001",
    timestamp: "2026-09-18 08:20:15",
    operator: {
      name: "Admin",
      email: "admin@zenfocus.io",
    },
    category: "ROLE_PERM",
    action: "role:create",
    description: "新增自訂角色：Finance Ops",
    ipAddress: "220.135.42.10",
    location: "Taiwan (Taipei)",
    status: "success",
    level: "info",
    payload: {
      roleCode: "ROLE-005",
      roleName: "Finance Ops",
      permissions: ["billing:read", "report:read"],
    },
  },
  {
    id: "LOG-20260918-002",
    timestamp: "2026-09-18 07:45:02",
    operator: {
      name: "Developer",
      email: "dev@zenfocus.io",
    },
    category: "API_KEY",
    action: "api:create",
    description: "建立生產環境 API Key (sk_live_****8f9a)",
    ipAddress: "118.163.12.88",
    location: "Taiwan (Hsinchu)",
    status: "success",
    level: "info",
    payload: {
      keyName: "Stripe Integration Key",
      scopes: ["api:read", "api:write"],
    },
  },
  {
    id: "LOG-20260917-003",
    timestamp: "2026-09-17 23:12:40",
    operator: {
      name: "Unknown",
      email: "hacker@suspicious.com",
    },
    category: "SYSTEM",
    action: "user:login",
    description: "後台登入失敗：密碼錯誤超過上限",
    ipAddress: "45.154.255.12",
    location: "Romania (Bucharest)",
    status: "failure",
    level: "error",
    payload: {
      attemptCount: 5,
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    },
  },
  {
    id: "LOG-20260917-004",
    timestamp: "2026-09-17 16:30:00",
    operator: {
      name: "Auditor",
      email: "auditor@zenfocus.io",
    },
    category: "USER_MGMT",
    action: "user:reset_pwd",
    description: "重置用戶 [ROLE-004 Viewer] 的登入密碼",
    ipAddress: "61.216.9.1",
    location: "Taiwan (Taipei)",
    status: "success",
    level: "warning",
    payload: {
      targetUserId: "USR-8821",
      targetUserEmail: "viewer_user@zenfocus.io",
    },
  },
  {
    id: "LOG-20260918-005",
    timestamp: "2026-09-18 09:15:30",
    operator: {
      name: "Sarah Chen",
      email: "sarah.chen@zenfocus.io",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    category: "ROLE_PERM",
    action: "role:update_permissions",
    description: "更新角色 [DevOps Specialist] 的存取控制清單與權限範圍",
    ipAddress: "211.75.132.45",
    location: "Taiwan (Taipei)",
    status: "success",
    level: "warning",
    payload: {
      roleId: "ROLE-009",
      roleName: "DevOps Specialist",
      updatedBy: "USR-1002",
      changes: {
        addedPermissions: [
          "k8s:cluster:deploy",
          "secret:vault:read",
          "ci_cd:pipeline:trigger",
        ],
        removedPermissions: ["billing:invoice:delete"],
      },
      metadata: {
        approvedBy: "Alex Wang (CTO)",
        ticketRef: "JIRA-8842",
        enforceMfa: true,
        ipWhitelist: ["211.75.132.0/24", "61.216.9.0/24"],
      },
      previousConfig: {
        maxSessions: 3,
        sessionTimeoutMinutes: 60,
      },
      newConfig: {
        maxSessions: 1,
        sessionTimeoutMinutes: 15,
      },
    },
  },
];
