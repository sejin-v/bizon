<script setup lang="ts">
</script>

<template>
  <div class="mgmt-layout">
    <sidebar-mgmt-sidebar />
    <div class="mgmt__container">
      <header-mgmt-header />
      <div class="mgmt__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
