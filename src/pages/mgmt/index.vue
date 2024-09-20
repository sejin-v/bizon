<!-- [관리자] 인덱스 화면 -->
<script setup lang="ts">
// TODO: 로그인 여부 확인 후 로그인화면으로 갈지 관리자 프로젝트 관리 화면으로 갈지 결정하기(로그인 기능 붙일때)
const router = useRouter()
router.push('/mgmt/project')
</script>

<template>
  <div>
    [관리자] 인덱스 화면입니다.
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
meta:
  layout: MgmtLayout
</route>
