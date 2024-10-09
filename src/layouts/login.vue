<script setup lang="ts"></script>

<template>
  <main class="layout layout--login">
    <header class="header header--login">
      <h1 class="logo">
        <a href="javascript:void(0);">
          <icon name="logo-lg" alt="LG U+" class="mr-2.5" />
          <span>비즈온 증속 신청</span>
        </a>
      </h1>
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
