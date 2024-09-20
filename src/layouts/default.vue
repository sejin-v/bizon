<script setup lang="tsx">
// import ElSidebarMenu from '~/components/ElSidebarMenu.vue'

// const { width: winWidth, height: winHeight } = useWindowSize()

// const isResponsiveSize = computed(() => {
//   return winWidth.value <= 1500
// })
</script>

<template>
  <!-- <div class="layout" :class="{ 'layout--md': isResponsiveSize }">
    <div class="menu"> -->
  <!-- 메뉴 -->
  <!-- <layout-sidebar />
      <div class="content"> -->
  <!-- Container -->
  <!-- <div class="content__wrapper" :style="`height: ${winHeight}px`">
          <router-view />
        </div>
      </div>
    </div>
  </div> -->
  <!-- <div class="flex">
    <div>
      <ElSidebarMenu />
    </div>
    <div class="content__wrapper" :style="`height: ${winHeight}px`">
      <router-view />
    </div>
  </div> -->
  <div class="layout">
    <!-- <ElSidebarMenu /> -->
    <router-view />
  </div>
</template>

<style lang="scss" scoped></style>
