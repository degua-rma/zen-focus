import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // --- State (基本資料) ---
  const isLoggedIn = ref(false);
  const user = ref<{ name: string; email: string } | null>(null);
  const token = ref<string | null>(localStorage.getItem("token")); // 初始化時嘗試從本地拿 token

  // --- Getters (計算屬性) ---
  const userName = computed(() => user.value?.name || "訪客");

  // --- Actions (方法/邏輯) ---
  // 模擬登入成功後的處理
  function login(userData: { name: string; email: string }, userToken: string) {
    isLoggedIn.value = true;
    user.value = userData;
    token.value = userToken;

    // 存入 localStorage，這樣重新整理頁面才不會消失
    localStorage.setItem("token", userToken);
  }

  // 登出處理
  function logout() {
    isLoggedIn.value = false;
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
  }

  return {
    isLoggedIn,
    user,
    token,
    userName,
    login,
    logout,
  };
});
