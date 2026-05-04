import { createRouter, createWebHistory } from "vue-router";
// 1. 定義路由

// 1-1. 會顯示在Menu的頁面
export const menuRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "首頁" },
  },
  {
    path: "/payment-setting",
    name: "payment-setting",
    component: () => import("@/views/PaymentSettingView.vue"),
    meta: { title: "繳費設定" },
  },
];

const routes = [
  ...menuRoutes,
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
