<template>
  <el-drawer v-model="visible" direction="rtl" size="50%">
    <template #header>
      <h3>{{ logData?.id ?? "" }} 異動詳情</h3>
    </template>
    <template #default>
      <el-descriptions
        border
        :label-width="100"
        size="small"
        :column="2"
        class="mb-4"
      >
        <el-descriptions-item :rowspan="3">
          <template #label>
            <div class="cell-item">操作人員</div>
          </template>
          <UserCell :user="logData?.operator" />
        </el-descriptions-item>

        <el-descriptions-item v-for="item in tagTypeColumns" :key="item.prop">
          <template #label>
            <div class="cell-item">{{ item.title }}</div>
          </template>
          <MapTag :map="item.map" :value="getValue(item.prop)" />
        </el-descriptions-item>

        <el-descriptions-item
          v-for="item in descriptionColumns"
          :key="item.prop"
          :span="item.span"
        >
          <template #label>
            <div class="cell-item">{{ item.label }}</div>
          </template>
          {{ getValue(item.prop) }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="relative">
        <el-button
          type="default"
          size="small"
          :icon="CopyDocument"
          class="copy-btn"
          style="position: absolute; right: 12px; top: 12px"
          @click="copyToClipboard(logData?.payload ?? {})"
        >
          複製 JSON
        </el-button>
        <pre
          class="json-code"
        ><code>{{ formattedJson(logData?.payload ?? {}) }}</code>
        </pre>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { copyToClipboard } from "@/utils/clipboard";
import { CopyDocument } from "@element-plus/icons-vue";

// 對照表
import { MAP_CATEGORY, MAP_STATUS, MAP_LEVEL } from "@/constants/AuditLogsMap";

// components
import MapTag from "@/components/table/MapTag.vue";

const props = defineProps<{
  modelValue: boolean;
  logData: Record<string, any> | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

import type { AuditLogItem } from "@/types/auditLog";
const getValue = (key: keyof AuditLogItem) => {
  return props.logData?.[key] ?? "";
};

const formattedJson = (obj: Record<string, any>) => {
  return JSON.stringify(obj, null, 2);
};

const descriptionColumns = computed(
  () =>
    [
      { prop: "timestamp", label: "操作時間", span: 1 },
      { prop: "id", label: "日誌編號", span: 1 },
      { prop: "ipAddress", label: "IP 位址", span: 1 },
      { prop: "location", label: "來源地區", span: 1 },
      { prop: "action", label: "操作行為", span: 2 },
      { prop: "description", label: "詳細說明", span: 2 },
    ] as const,
);

const tagTypeColumns = computed(
  () =>
    [
      { prop: "category", title: "事件分類", map: MAP_CATEGORY },
      { prop: "status", title: "執行狀態", map: MAP_STATUS },
      { prop: "level", title: "風險等級", map: MAP_LEVEL },
    ] as const,
);
</script>
