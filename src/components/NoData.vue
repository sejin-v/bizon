<script setup lang="ts">
withDefaults(defineProps<{
  message?: string

}>(), {
  message: '',
})
</script>

<template>
  <div class="nodata">
    <span class="el-icon-folder-delete"> {{ message }}</span>
  </div>
</template>

<style lang="scss"></style>
