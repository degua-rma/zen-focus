import { createI18n } from "vue-i18n";
import zh from "./zh-TW.json";
import en from "./en-US.json";

const i18n = createI18n({
  legacy: false, // 用 Composition API 模式，跟 Vue3 最搭
  globalInjection: true, // 把 $t 注入到所有全域元件中
  locale: localStorage.getItem("user-lang") || "zh-TW", // 優先讀取紀錄
  fallbackLocale: "en-US",
  messages: {
    "zh-TW": zh,
    "en-US": en,
  },
});

export default i18n;
