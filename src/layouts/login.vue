<script setup lang="ts">
const route = useRoute();

const isChangePasswordPage = computed(() => {
  return route.fullPath === '/login/changePw';
});
</script>

<template>
  <main class="layout layout--login">
    <header class="header header--login">
      <h1 class="logo">
        <a href="javascript:void(0);">
          <icon name="logo-lg" alt="LG U+" class="mr-2.5" />
          <span>비즈온 증속신청</span>
        </a>
      </h1>
      <button type="button" v-if="isChangePasswordPage">
        <span class="ml-1">로그인</span>
      </button>
    </header>
    <div class="containers">
      <div class="content">
        <router-view />
      </div>
      <layout-footer />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
