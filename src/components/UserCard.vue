<script setup lang="ts">
withDefaults(
  defineProps<{
    userImage?: string;
    userName: string;
    userAuth: string;
  }>(),
  {
    userImage:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    userName: '',
  }
);
</script>

<template>
  <el-card style="max-width: 220px">
    <div class="flex">
      <el-avatar :size="50" :src="userImage" />
      <div></div>
      <p class="text-l ml-5 mt-4">{{ userName }}({{ userAuth }})</p>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>
