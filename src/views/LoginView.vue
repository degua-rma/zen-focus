<template>
  <div class="login-view linear-bg">
    <div class="login-info glass-card">
      <div class="logo">ZEN FOCUS</div>
      <input
        type="text"
        name="email"
        :placeholder="$t('login.input-username')"
        class="glass-input"
      />
      <input
        type="password"
        name="password"
        :placeholder="$t('login.input-password')"
        class="glass-input"
      />
      <el-row :gutter="4" class="px-1">
        <el-col :span="12">
          <a href="" class="forgot-password">
            <el-icon class="mr-1"><QuestionFilled /></el-icon>
            <span>{{ $t("login.no-account") }}</span>
          </a>
        </el-col>
        <el-col :span="12">
          <a href="" class="forgot-password justify-end">
            <el-icon class="mr-1"><QuestionFilled /></el-icon>
            <span>{{ $t("login.forget-password") }}</span>
          </a>
        </el-col>
      </el-row>
      <button class="glass-main-button">{{ $t("login.sign-in") }}</button>
      <div class="text-divider">{{ $t("login.or") }}</div>
      <button class="glass-other-btn">
        <IconGoogle class="button-icon" />
        <span class="mx-auto">{{ $t("login.continue-google") }}</span>
      </button>
      <button class="glass-other-btn">
        <el-icon class="button-icon"><Avatar /></el-icon>
        <span class="mx-auto">{{ $t("login.continue-guest") }}</span>
      </button>
    </div>

    <el-popover
      ref="popoverRef"
      placement="bottom-end"
      :width="160"
      trigger="click"
    >
      <template #reference>
        <div id="lang-change" class="glass-icon-button">
          <img src="../assets/lang.png" alt="lang-change" class="glass-icon" />
        </div>
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
import { Avatar, QuestionFilled } from "@element-plus/icons-vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import { ElNotification } from "element-plus";

// 調用全域語系
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useSettingStore } from "@/store/setting";
const settingStore = useSettingStore();
const popoverRef = ref();

// 語系對照表
const langMap = Object.fromEntries(
  settingStore.langType.map((item) => [item.value, item.text]),
);

// 切換全域語系
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

<style scoped lang="scss">
.logo {
  text-align: center;
  font-size: 28px;
  padding: 8px 0;
  letter-spacing: 2px;
  opacity: 0.5;
}

.linear-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, $light-color, $main-color);
}

.login-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  #lang-change {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
.login-info {
  width: 100%;
  max-width: 500px;
}

.forgot-password {
  display: flex;
  align-items: center;
  font-size: $font-size-h5;
  color: $text-color;
  opacity: 0.6;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
}
</style>
