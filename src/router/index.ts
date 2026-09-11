import { createRouter, createWebHistory } from "vue-router";
// 1. 定義路由

// 1-1. 會顯示在Menu的頁面
export const menuRoutes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "儀錶板" },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView.vue"),
    meta: { title: "管理" }, // Administration
    children: [
      {
        path: "role-permissions",
        name: "role-permissions",
        component: () => import("@/views/admin/RolePermissionsView.vue"),
        meta: { title: "權限管理" }, // Role & Permissions
      },
      {
        path: "org",
        name: "org",
        component: () => import("@/views/admin/OrgView.vue"),
        meta: { title: "組織管理" }, // Organization
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/admin/UsersView.vue"),
        meta: { title: "用戶管理" }, // User Management
      },
      {
        path: "api-key",
        name: "api-key",
        component: () => import("@/views/admin/ApiKeyView.vue"),
        meta: { title: "API管理" },
      },
    ],
  },
  {
    path: "/security",
    name: "security",
    component: () => import("@/views/SecurityView.vue"),
    meta: { title: "資安與合規" }, // Security & Compliance
    children: [
      {
        path: "audit-logs",
        name: "audit-logs",
        component: () => import("@/views/security/AuditLogsView.vue"),
        meta: { title: "審計日誌" }, // Audit Logs
      },
      {
        path: "login-logs",
        name: "login-logs",
        component: () => import("@/views/security/LoginLogsView.vue"),
        meta: { title: "存取與登入紀錄" }, // Access & Login Logs
      },
      {
        path: "api-logs",
        name: "api-logs",
        component: () => import("@/views/security/ApiLogsView.vue"),
        meta: { title: "API調用紀錄" }, // API Logs
      },
      {
        path: "active-sessions",
        name: "active-sessions",
        component: () => import("@/views/security/ActiveSessionsView.vue"),
        meta: { title: "活動階段與裝置管理" }, // Active Sessions
      },
    ],
  },
  {
    path: "/personal-tools",
    name: "personal-tools",
    component: () => import("@/views/PersonalToolView.vue"),
    meta: { title: "個人化工具" },
    children: [
      {
        path: "payment-setting",
        name: "payment-setting",
        component: () =>
          import("@/views/personal-tools/PaymentSettingView.vue"),
        meta: { title: "繳費提醒" },
      },
    ],
  },
  {
    path: "/showcase",
    name: "showcase",
    component: () => import("@/views/ShowcaseView.vue"),
    meta: { title: "案例展示" },
  },
];

const routes = [
  {
    path: "/",
    component: () => import("@/layout/MainLayout.vue"),
    children: [...menuRoutes],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { title: "登入" },
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/SettingView.vue"),
    meta: { title: "設定" },
  },
];

// 2. 建立路由實例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 3. (選配) 導航守衛：之後妳要做「沒登入就踢回登入頁」的邏輯就寫在這裡
router.beforeEach((to, from, next) => {
  // 這裡可以根據 meta.title 改網頁標籤名稱
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
