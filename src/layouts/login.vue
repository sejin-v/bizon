<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const isChangePasswordPage = computed(() => {
  return (
    route.fullPath === '/login/changePw' || route.fullPath === '/login/findPw'
  );
});

const handleMoveLoginPage = () => {
  router.push('/login');
};
</script>

<template>
  <main class="layout layout--login">
    <header class="header header--login">
      <h1 class="logo">
        <a href="javascript:void(0);">
          <icon
            height="28"
            name="lguplus-logo--gray"
            extension="png"
            alt="LG U+"
            class="mr-2.5"
          />
          <span>비즈온 증속신청</span>
        </a>
      </h1>
      <button
        type="button"
        v-if="isChangePasswordPage"
        @click="handleMoveLoginPage"
      >
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
