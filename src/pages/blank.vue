<script setup lang="ts">
const route = useRoute()
const router = useRouter()

router.replace(route.query.targetUrl)
</script>

<template>
  <div />
</template>

<style scoped></style>
