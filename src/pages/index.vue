<script setup lang="ts">
// import { useLogger } from 'vue-logger-plugin'

// const log = useLogger()
// const router = useRouter()
// onMounted(() => {
// log.info('on mounted', router.options.routes)
// })
const router = useRouter();

const moveMainScreen = () => {
  router.push('/apply');
};
moveMainScreen();
</script>

<template>
  <div></div>
</template>

<!-- <route lang="yaml">
name: landing
meta:
  isPublicPath: true
</route> -->
