import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // 記得匯入 path
// 自動按需引入element plus UI
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 這行會自動把變數檔案注入到每個 scss 區塊，不用手動 import
        additionalData: `@import "@/assets/styles/_variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 這樣妳就能用 @ 符號指向 src
    },
  },
});
