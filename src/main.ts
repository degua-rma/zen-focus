import { createApp } from "vue";
import { createPinia } from "pinia"; // 導入 Pinia
import "./assets/styles/main.scss";
import App from "./App.vue";
import router from "./router"; // 引入剛寫好的 router

const app = createApp(App);

app.use(createPinia()); // 掛載 Pinia
app.use(router); // 告訴 Vue 我要使用這個路由系統
app.mount("#app");
