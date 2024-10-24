<script lang="ts" setup>
const router = useRouter();
const userId = ref('');
const phoneNumber = ref('');
const authNumber = ref('');

const userIdError = ref('');
const phoneNumberError = ref('');
const authNumberError = ref('');
const checkAuthButtonDisabled = ref(true);
const useTimer = ref(false);
const authButtonDisabled = computed(() => {
  return userId.value && phoneNumber.value.length === 11;
});

const confirmOpen = async (message: string) => {
  await openConfirm({
    content: message,
    center: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    hideCancelButton: true,
  });
  return;
};
const handleAuthNumber = async () => {
  useTimer.value = false;
  const params = {
    userId: userId.value,
    phoneNumber: phoneNumber.value,
  };
  try {
    await request.get('/bizon/api/account/send-otp', { params });
    checkAuthButtonDisabled.value = false;
    useTimer.value = true;
  } catch (error: any) {
    confirmOpen(error.message);
  }
};

const handleUpdate = (target: string) => {
  phoneNumber.value = target;
};

const handleEndTimer = () => {
  checkAuthButtonDisabled.value = true;
  authNumber.value = '';
};

const handleAuth = async () => {
  const data = {
    otp: authNumber.value,
  };
  try {
    await request.post('/bizon/api/account/validate-otp', { ...data });
    await confirmOpen('인증되었습니다.');
    router.push('/login/changePw');
  } catch (error: any) {
    await confirmOpen(error.message);
  }
};
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
        <CustomInput
          v-model="userId"
          placeholder="이름을 입력하세요."
          v-model:valid-message="userIdError"
        />
      </FormItem>
      <FormItem label="휴대폰 번호">
        <CustomNumberInput
          max-length="11"
          :value="phoneNumber"
          placeholder="&#45; 없이 숫자로만 입력"
          @update="handleUpdate"
          v-model:valid-message="phoneNumberError"
        />
      </FormItem>
    </form>
    <button
      type="button"
      class="w-full btn__line--primary-md"
      :disabled="!authButtonDisabled || !checkAuthButtonDisabled"
      @click="handleAuthNumber"
    >
      인증번호 발송
    </button>
    <FormItem group>
      <CustomInput
        v-model="authNumber"
        placeholder="인증번호를 입력하세요."
        max-length="6"
        v-model:valid-message="authNumberError"
        :use-timer="useTimer"
        :disabled="checkAuthButtonDisabled"
        @endTimer="handleEndTimer"
      />
      <button
        type="button"
        class="btn__full--primary-md"
        :disabled="checkAuthButtonDisabled || authNumber.length !== 6"
        @click="handleAuth"
      >
        인증하기
      </button>
    </FormItem>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
name: find-pw
meta:
  isPublicPath: true
  layout: login
</route>
