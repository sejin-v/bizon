<!-- 관리자 화면 Header (MgmtLayout)  -->

<script setup lang="ts">
const userStore = useUserStore()
const { user } = userStore
</script>

<template>
  <header class="header--mgmt">
    <div v-if="user" class="header__user">
      <Icon name="user__circle--f3f" width="24" height="24" alt="사용자" />
      <span class="ml-1">{{ user.name }}</span>
    </div>
    <button type="button" @click="userStore.logout">
      <Icon name="logout__line--222" width="24" height="24" alt="로그아웃" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
@import '~/styles/components/header'
</style>
