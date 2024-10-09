<script setup lang="ts">
import '~/styles/main.scss'

import { storeToRefs } from 'pinia'

const ACircularLoading = defineAsyncComponent(
  () => import('~/components/ACircularLoading/component.vue')
)
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'biz-on',
  meta: [
    { name: 'description', content: 'biz-on' },
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#00aba9' : '#ffffff')),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.ico',
      // href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
});
const log = useLogger();
onErrorCaptured((hook, instance, message) => {
  log.error(
    'Vue Global Error: hook: ',
    hook,
    '\n instance: ',
    instance,
    'message: ',
    message
  );
});
const store = useProgressStore();
const { isShowCircularLoading, isDisableOutside } = storeToRefs(store);
</script>

<template>
  <Transition>
    <ACircularLoading
      v-if="isShowCircularLoading"
      :disable-click-outside="isDisableOutside"
    />
  </Transition>
  <RouterView />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
