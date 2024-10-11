<script setup lang="ts">
withDefaults(
  defineProps<{
    userImage?: string;
    speechObject: string;
  }>(),
  {
    userImage:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    speechObject: '',
  }
);
</script>

<template>
  <el-card style="max-width: 550px">
    <div class="flex">
      <el-avatar :size="50" :src="userImage" />
      <div>
        <p class="ml-5 text-xl font-bold">You</p>
        <p class="ml-5 mt-1" style="width: 400px">{{ speechObject }}</p>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>
