import { createRouter, createWebHistory } from "vue-router";
// 1. 定義路由
const routes = [
  {
    path: "/login",
    name: "login",
    // 懶加載：只有進入該頁面時才載入組件，對性能優化很有幫助
    component: () => import("@/views/LoginView.vue"),
    meta: { title: "登入" },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "首頁" },
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
