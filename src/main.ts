import { createApp } from "vue";
import { createPinia } from "pinia"; // 導入 Pinia
import "./assets/styles/main.scss";
import App from "./App.vue";
import router from "./router"; // 引入剛寫好的 router

// 引入所有icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 透過迴圈將所有圖示註冊到全域
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia()); // 掛載 Pinia
app.use(router); // 告訴 Vue 我要使用這個路由系統
app.mount("#app");
