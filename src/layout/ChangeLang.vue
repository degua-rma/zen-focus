<template>
  <div class="change-lang-btn">
    <el-popover
      ref="popoverRef"
      placement="bottom-end"
      :width="160"
      trigger="click"
    >
      <template #reference>
        <div v-if="props.type === 'login'" class="glass-icon-button">
          <img src="../assets/lang.png" alt="lang-change" />
        </div>
        <el-button v-else circle style="padding: 4px">
          <img src="../assets/lang.png" alt="lang-change" />
        </el-button>
      </template>
      <h5>{{ $t("lang.change-lang") }}</h5>
      <hr class="mt-2 mb-2" />
      <el-radio-group
        :model-value="settingStore.lang"
        @change="handleLangChange"
      >
        <el-space direction="vertical" alignment="start">
          <el-radio
            v-for="el in settingStore.langType"
            :value="el.value"
            :key="el.value"
            size="small"
            >{{ el.text }}</el-radio
          >
        </el-space>
      </el-radio-group>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useSettingStore } from "@/store/setting";
import { ElNotification } from "element-plus";

// 從父層傳進來的 props
const props = defineProps({
  type: {
    type: String,
    default: "login",
  },
});

// 調用全域語系
const { t } = useI18n();
// 調用全域變數
const settingStore = useSettingStore();

// 語系對照表
const langMap = Object.fromEntries(
  settingStore.langType.map((item) => [item.value, item.text]),
);

// 切換全域語系
const popoverRef = ref();
const handleLangChange = (val: string | number | boolean) => {
  settingStore.setLanguage(val as string);
  ElNotification({
    title: t("lang.lang-switched-title"),
    message: `${t("lang.lang-switched-msg")}${langMap[val as string]}`,
    type: "primary",
  });
  // 關閉外層popover元件
  if (popoverRef.value) {
    popoverRef.value.hide();
  }
};
</script>
