<!-- 랜딩 페이지(carousal 적용) -->
<script setup lang="ts">
const { height } = useWindowSize()

const carouselHeight = computed(() => `${height.value}px`)
</script>

<template>
  <div class="h-full">home</div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>
