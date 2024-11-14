<script lang="ts" setup>
import JSEncrypt from 'jsencrypt';

const router = useRouter();
const route = useRoute();
const password = ref('');
const confirmPassword = ref('');

const passwordError = ref('');
const confirmPasswordError = ref('');

const getPublicKey = async () => {
  const params = {
    userId: route.params.userId,
  };
  const result = await request.get('/bizon/api/account/public-key', {
    params,
    headers: {
      'X-COMMAND': 'P07004',
    },
  });
  return result.data.data;
};

const handleChangePassword = async () => {
  if (!password.value) return;
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = '* 비밀번호를 다시 확인해주세요';
    return;
  }
  const publicKey = await getPublicKey();

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encryptedPassword = encrypt.encrypt(password.value);
  const data = {
    password: encryptedPassword,
  };
  try {
    await request.post(
      '/bizon/api/account/modify-password',
      {
        ...data,
      },
      {
        headers: {
          'X-COMMAND': 'P07004',
        },
      }
    );
    await openConfirm({
      content: '변경되었습니다.',
      center: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      hideCancelButton: true,
    });

    router.push('/login');
  } catch (error: any) {
    if (error.code === '40002006') {
      passwordError.value = '* 비밀번호 생성 규칙을 확인하세요';
    } else {
      passwordError.value = error.message;
    }
    console.error(error);
  }
};

const handleCancelButton = () => {
  router.push('/login');
};
</script>

<template>
  <div class="password">
    <h2 class="text-center title">비밀번호 변경</h2>
    <p class="text-center title__desc">
      새로운 비밀번호를 입력 하시면 새로운 비밀번호로 서비스 이용이 가능합니다.
    </p>
    <form class="password__form form">
      <FormItem label="새 비밀번호">
        <CustomInput
          type="password"
          v-model="password"
          max-length="40"
          placeholder="새 비밀번호를 입력하세요."
          v-model:valid-message="passwordError"
        />
      </FormItem>
      <FormItem label="새 비밀번호 확인">
        <CustomInput
          type="password"
          v-model="confirmPassword"
          max-length="40"
          placeholder="새 비밀번호를 다시 입력하세요."
          v-model:valid-message="confirmPasswordError"
        />
      </FormItem>
      <div class="flex">
        <button
          type="button"
          class="w-full btn__line--negative-md"
          @click="handleCancelButton"
        >
          취소
        </button>
        <button
          type="button"
          class="w-full btn__full--primary-md"
          @click="handleChangePassword"
        >
          비밀번호 변경
        </button>
      </div>
    </form>

    <ul class="list">
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>비밀번호 변경 완료 이후에는 신규 비밀번호로 로그인하십시오.</p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          안전한 패스워드 사용을 위해 영문 대소문자, 숫자, 특수문자 조합으로
          8자리 이상 설정하십시오.
        </p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          안전한 패스워드 사용을 위해 영문 대소문자, 숫자 조합으로 10자리
          이상으로 설정하십시오.
        </p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>
          비밀번호로 생년월일, 주민등록번호 앞자리, 핸드폰 번호 등의 개인정보는
          사용하지 마십시오.
        </p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>최근 3회 사용했던 비밀번호는 사용할 수 없습니다.</p>
      </li>
      <li>
        <icon
          name="check-circle__line"
          width="16"
          height="16"
          alt=""
          aria-hidden="true"
          class="mr-2"
        />
        <p>비밀번호는 주기적으로 변경하여 정보 노출을 보호하세요.</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
name: change-pw-login
meta:
  isPublicPath: true
  layout: login
</route>
