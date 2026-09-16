// 權限列表
import type { PermissionCategory } from "@/types/permission";

export const permissionList: PermissionCategory[] = [
  {
    category: "user",
    categoryName: "用戶管理 (User Management)",
    items: [
      {
        code: "user:read",
        name: "檢視用戶",
        description: "可查看用戶列表與個人詳細基本資料",
      },
      {
        code: "user:create",
        name: "建立用戶",
        description: "可新增系統帳號並發送邀請信件",
      },
      {
        code: "user:write",
        name: "編輯用戶",
        description: "可修改用戶姓名、部門等基本資訊",
      },
      {
        code: "user:status",
        name: "變更狀態",
        description: "可執行帳號的啟用、停用與封存操作",
      },
      {
        code: "user:reset_pwd",
        name: "重設密碼",
        description: "可強制重置指定用戶的登入密碼",
      },
    ],
  },
  {
    category: "role",
    categoryName: "權限與角色 (Role & Permission)",
    items: [
      {
        code: "role:read",
        name: "檢視角色",
        description: "可檢視系統角色矩陣與權限配置內容",
      },
      {
        code: "role:create",
        name: "建立自訂角色",
        description: "可複製範本或自訂全新角色權限組合",
      },
      {
        code: "role:write",
        name: "編輯角色",
        description: "可調整自訂角色的權限勾選清單",
      },
      {
        code: "role:delete",
        name: "刪除角色",
        description: "可移除無人綁定的自訂角色",
      },
    ],
  },
  {
    category: "api",
    categoryName: "API 與金鑰 (API & Integration)",
    items: [
      {
        code: "api:read",
        name: "檢視 API 密鑰",
        description: "可檢視系統目前的 API 金鑰列表與調用次數",
      },
      {
        code: "api:write",
        name: "管理 API 密鑰",
        description: "可新增、廢止（Revoke）或重新產生 API 金鑰",
      },
      {
        code: "api:full_access",
        name: "完整 API 存取",
        description: "允許通過 API 呼叫所有後端數據端點",
      },
    ],
  },
  {
    category: "audit",
    categoryName: "審計與合規 (Audit & Compliance)",
    items: [
      {
        code: "audit:read",
        name: "檢視審計日誌",
        description: "可查詢全系統的操作軌跡與資安 Log",
      },
      {
        code: "audit:export",
        name: "匯出審計日誌",
        description: "允許將歷史資安紀錄匯出為 CSV/JSON 檔案",
      },
    ],
  },
  {
    category: "billing",
    categoryName: "訂閱與財務 (Billing & Finance)",
    items: [
      {
        code: "billing:read",
        name: "檢視帳單",
        description: "可檢視方案訂閱狀態、發票與扣款紀錄",
      },
      {
        code: "billing:manage",
        name: "管理訂閱",
        description: "可升降級方案、變更信用卡與付款資訊",
      },
    ],
  },
  {
    category: "report",
    categoryName: "報表與分析 (Report & Analytics)",
    items: [
      {
        code: "report:read",
        name: "檢視儀表板",
        description: "可查看系統營運數據與視覺化圖表",
      },
      {
        code: "report:export",
        name: "匯出報表",
        description: "允許下載業務營運與資產數據報表",
      },
    ],
  },
];
