<script setup lang="ts">
import NProgress from 'nprogress'

const loadStart = () => {
  NProgress.start()
}

const loadEnd = () => {
  NProgress.done()
}
</script>

<template>
  <div class="space-y-40px">
    <h1 class="text-2xl text-left font-medium">
      Loading
    </h1>

    <div class="flex-center">
      <el-button type="button" @click="loadStart">
        로딩 시작
      </el-button>
      <el-button type="button" @click="loadEnd">
        로딩 종료
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flex-center {
  @apply flex items-center;
}
</style>
