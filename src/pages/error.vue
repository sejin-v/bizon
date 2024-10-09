<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="error">
    <div>
      <icon name="system-error" width="192" height="120" alt="" aria-hidden="" />
      <em>죄송합니다.<br />일시적인 시스템 장애 입니다.</em>
      <p>
        시스템 오류로 인하여 해당 페이지를 표시할 수 없습니다. <br />
        잠시 후 다시 이용해 주시기 바랍니다.
      </p>
      <button class="btn__line--primary-md" @click="router.back()">뒤로가기</button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
