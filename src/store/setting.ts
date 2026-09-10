import { defineStore } from "pinia";
import i18n from "@/locales";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    domHeight: 0,
    // 優先從本地儲存讀取，如果沒有就預設繁體中文
    lang: localStorage.getItem("user-lang") || "zh-TW",
    langType: [
      {
        value: "zh-TW",
        text: "繁體中文",
      },
      {
        value: "en-US",
        text: "English",
      },
    ],
  }),
  actions: {
    // 取得視窗高度
    initDomHeight() {
      if (this.domHeight) return;
      this.domHeight = window.innerHeight;
    },
    setLanguage(newLang: string) {
      this.lang = newLang;
      // 1. 修改 vue-i18n 的全域狀態 (如果是 Composition API 模式要改全域的 global.locale)
      (i18n.global.locale as any).value = newLang;
      // 2. 存入 localStorage，下次打開頁面時會自動讀取
      localStorage.setItem("user-lang", newLang);
    },
  },
});
