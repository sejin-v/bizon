<script setup lang="ts">
const router = useRouter();
const route = useRoute();
onMounted(async () => {
  const userStore = useUserStore();
  if (route.redirectedFrom?.fullPath) return;
  // await userStore.checkSystemMaintenance()
  // const isSystemMaintenance = userStore.systemMaintenance
  // if (isSystemMaintenance === 'OK') router.push('/');
});
</script>

<template>
  <div class="w-full h-full">
    <maintenance />
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>
