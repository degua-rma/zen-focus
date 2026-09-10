import { createApp } from "vue";
import { createPinia } from "pinia"; // 全域變數管理store
import "./assets/styles/main.scss";
import App from "./App.vue";
import router from "./router"; // 路由
import i18n from "./locales"; // 語系切換
import { useSettingStore } from "./store/setting";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
useSettingStore(pinia).initDomHeight();
app.use(router);
app.use(i18n);
app.mount("#app");
