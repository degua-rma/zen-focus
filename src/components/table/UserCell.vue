<script setup lang="ts">
interface UserData {
  name?: string;
  email?: string;
  avatar?: string;
}

const props = defineProps<{
  user?: UserData | null;
}>();
</script>

<template>
  <div>
    <h6 class="flex items-center">
      <el-avatar
        v-if="props.user?.avatar"
        :size="16"
        :src="props.user.avatar"
        class="mr-2"
      />
      <span>{{ props.user?.name ?? "" }}</span>
    </h6>
    <p>{{ props.user?.email ?? "" }}</p>
  </div>
</template>
