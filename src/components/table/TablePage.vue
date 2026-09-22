<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    total?: number;
  }>(),
  {
    total: 0,
  },
);

// 頁碼使用雙向綁定，pageSize 寫死在元件內部
const currentPage = defineModel<number>("currentPage", { default: 1 });
const pageSize = ref(10);
const pageSizes = [10, 20, 30, 40];

const emit = defineEmits<{
  (e: "page-change", page: number, size: number): void;
}>();

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  emit("page-change", currentPage.value, val);
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  emit("page-change", val, pageSize.value);
};
</script>

<template>
  <div class="table-page-container">
    <slot />

    <div class="flex items-center justify-center mt-4">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        size="default"
        :page-sizes="pageSizes"
        layout="total, prev, pager, next, sizes"
        :total="props.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
