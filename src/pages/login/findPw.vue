<script lang="ts" setup>
const id = ref('')
const phoneNum = ref('')
</script>

<template>
  <div class="password password--find">
    <h2 class="text-center title">비밀번호 찾기</h2>
    <p class="text-center title__desc">
      회원 가입 시 입력한 이름, 휴대폰번호(인증) 입력 후 <br />
      인증을 완료하면 비밀번호를 변경할 수 있습니다.
    </p>
    <form class="password__form form">
      <FormItem label="아이디">
        <CustomInput v-model="id" placeholder="이름을 입력하세요." valid-message="&#42; 존재하지 않는 아이디입니다. 다시 확인해주세요." />
      </FormItem>
      <FormItem label="휴대폰 번호">
        <CustomInput v-model="phoneNum" placeholder="&#45; 없이 숫자로만 입력" valid-message="&#42; 유효한 휴대폰번호가 아닙니다. 다시 확인해주세요." />
      </FormItem>
    </form>
    <button type="button" class="w-full btn__line--primary-md">인증번호 발송</button>
    <FormItem group>
      <CustomInput v-model="pw" placeholder="인증번호를 입력하세요." valid-message="&#42; 인증번호를 잘못 입력했습니다. 다시 확인해주세요." use-timer />
      <button type="button" class="btn__full--primary-md">인증하기</button>
    </FormItem>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
name: find-pw
meta:
  isPublicPath: true
  layout: default
</route>
