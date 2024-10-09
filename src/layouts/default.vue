<script setup lang="ts"></script>

<template>
  <main class="layout">
    <layout-header />
    <div class="containers">
      <div class="content">
        <router-view />
      </div>
      <layout-footer />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
