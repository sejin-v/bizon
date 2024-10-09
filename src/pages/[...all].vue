<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
console.log(route.params)
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: error
</route>
