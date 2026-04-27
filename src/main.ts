import { createApp } from "vue";
import { createPinia } from "pinia"; // 導入 Pinia
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia()); // 掛載 Pinia
app.mount("#app");
