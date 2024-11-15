<script setup lang="ts">
import { KEY_SAVED_ID } from '~/config';
import { IToastType, MODAL_SIZE, ILoginParams } from '~/types';
import JSEncrypt from 'jsencrypt';

const router = useRouter();
const { setUser } = useUserStore();

const userId = ref('');
const password = ref('');
const rememberId = ref(false);
const guidePopupShow = ref(false);

const confirmOption = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: true,
});

// 아이디 기억하기 여부에 따른 아이디 값 초기 셋팅
const checkRemeberLoginData = () => {
  if (localStorage.getItem(KEY_SAVED_ID)) {
    userId.value = localStorage.getItem(KEY_SAVED_ID) ?? '';
    rememberId.value = true;
  }
};

// 로그인 전 validation 체크 실행
const validateLogin = () => {
  return !!userId.value && !!password.value;
};

const confirmOpen = async (message: string) => {
  confirmOption.content = message;
  try {
    await openConfirm(confirmOption);
  } catch (error) {}
};

const getParams = (publicKey: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encryptedPassword = encrypt.encrypt(password.value);
  return {
    info1: userId.value,
    info2: encryptedPassword as string,
  };
};

const getPublicKey = async () => {
  try {
    const params = {
      userId: userId.value,
    };
    const result = await request.get('/bizon/api/account/public-key', {
      params,
      headers: {
        'X-COMMAND': 'P07002',
      },
    });
    return result.data.data;
  } catch (error) {}
};

// 로그인 실행
const fetchLogin = async (data: ILoginParams) => {
  const option: any = {
    content: '',
    center: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    hideCancelButton: false,
    confirmButtonText: '예',
    cancelButtonText: '아니오',
  };
  try {
    const result = await request.post(
      '/bizon/api/account/login',
      {
        ...data,
      },
      {
        headers: {
          'X-COMMAND': 'P07002',
        },
      }
    );

    if (result.data.code === '20001003') {
      router.push('login/changePw');
      return;
    }
    if (result.data.code === '20001005') {
      option.content = h('p', null, [
        h(
          'div',
          { style: 'text-align: center;' },
          '현재 다른 pc에서 로그인 중입니다'
        ),
        h('div', { style: 'text-align: center;' }, '강제 로그아웃하고'),
        h(
          'div',
          { style: 'text-align: center;' },
          '현재PC에서 로그인 하시겠습니까?'
        ),
      ]);
      try {
        await openConfirm(option);
        await request.post(
          '/bizon/api/account/login/duplicate-next',
          {},
          {
            headers: {
              'X-COMMAND': 'P07002',
            },
          }
        );
        router.push('/');
      } catch (error) {}
    } else if (result.data.code === '20001004') {
      option.confirmButtonText = '지금 변경하기';
      option.cancelButtonText = '3개월후 변경하기';
      option.content = h('p', null, [
        h(
          'div',
          { style: 'text-align: center;' },
          '3개월간 비밀번호를 변경하지 않으셨습니다.'
        ),
        h(
          'div',
          { style: 'text-align: center;' },
          '개인정보 보호를 위해 비밀번호를 변경해 주십시오.'
        ),
      ]);
      try {
        await openConfirm(option);
        router.push('login/changePw');
      } catch (error) {
        request.post(
          '/bizon/api/account/login/password-remind-next',
          {},
          {
            headers: {
              'X-COMMAND': 'P07002',
            },
          }
        );
        router.push('/');
      }
    }

    return result.data;
  } catch (e: any) {
    const { next, message, confirmAction, cancelAction, pass } =
      getErrorMessage(e.code);

    if (!pass) {
      confirmOption.content = message;
      try {
        if (message) await openConfirm(confirmOption);
        if (next) confirmAction!();
      } catch (error) {
        if (next) cancelAction!();
      }
    }
    throw e;
  }
};

const getUserData = async () => {
  try {
    const result = await request.get('/bizon/api/customer', {
      headers: {
        'X-COMMAND': 'P07002',
      },
    });
    return result.data;
  } catch (e: any) {
    throw e;
  }
};

// 로그인 버튼 클릭
const handleLogin = async () => {
  if (!validateLogin()) {
    confirmOpen('아이디 또는 비밀번호를 입력하세요.');
    return;
  }

  // try {
  try {
    const publicKey = await getPublicKey();
    const params = getParams(publicKey);
    await fetchLogin(params);
    const result = await getUserData();
    setUser(result.data);
    if (rememberId) {
      localStorage.setItem(KEY_SAVED_ID, userId.value);
    }
    router.push('/apply');
  } catch (error: any) {
    console.error(error);
  }
  //   if (typeof response === 'string') {
  //     if (response === 'no user') {
  //       confirmOption.content =
  //         '입력하신 계정이 정지되었거나 존재하지 않습니다. 관리자에게 문의하세요';
  //     } else {
  //       confirmOption.content = '아이디 또는 비밀번호를 다시 확인하세요.';
  //     }

  //     resetForm();
  //     // openConfirm(confirmOption);
  //   } else {
  //     // if (savedUserIdYn.value === 'Y') {
  //     //   localStorage.setItem(KEY_SAVED_ID, loginForm.email);
  //     // }
  //     // setUser(response);
  //     // setToken({
  //     //   accessToken: response.accessToken,
  //     //   refreshToken: response.refreshToken,
  //     // });
  //     // popup.show = true;
  //   }
  // } catch (e) {
  //   throw new Error('Failed to login');
  // }
};

// 약관 동의 팝업 취소 버튼 클릭
const handleAgreeCancelBtnClick = () => {
  // popup.show = false;
};

// 약관 동의 팝업 동의 버튼 클릭
const handleAgreeBtnClick = () => {
  // popup.show = false;
  openToast({
    message: '로그인 되었습니다.',
    type: IToastType.SUCCESS,
    showClose: false,
  });
  // let redirectUrl = router.currentRoute.value.query.redirectTo as string
  // if (!redirectUrl) redirectUrl = '/'
  router.push('/mgmt/project');
};

function openModal() {
  guidePopupShow.value = true;
}
function handleCancel() {
  guidePopupShow.value = false;
}

const handleFindPwPage = () => {
  router.push('login/findPw');
};

onMounted(async () => {
  await useUserStore().initUser('P07002');
  if (useUserStore().user?.entrNo) router.push('/');
  checkRemeberLoginData();
});
</script>

<template>
  <div class="login">
    <div class="login__wrap">
      <div class="login__title">
        <p>기업인터넷 전용 회선<br /><em>비즈온 증속신청 서비스</em></p>
        <div class="logo">
          <icon name="logo-bizon" alt="BIZ ON" class="mr-2.5" />
          <span>Precare</span>
        </div>
      </div>
      <div class="login__form">
        <div class="space-y-[16px]">
          <CustomInput
            v-model="userId"
            placeholder="가입번호를 입력하세요."
            @keyup.enter="handleLogin"
          />
          <CustomInput
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요."
            use-show-password
            @keyup.enter="handleLogin"
          />
          <div class="flex items-center justify-between">
            <el-checkbox v-model="rememberId"> 아이디 기억하기 </el-checkbox>
            <a href="javascript:void(0);" @click="handleFindPwPage"
              >비밀번호 찾기</a
            >
          </div>
        </div>
        <button
          type="button"
          class="w-full btn__full--primary-lg"
          @click="handleLogin"
        >
          로그인
        </button>
      </div>
      <div class="login__desc">
        최초 로그인 시 아이디는 사용중인 서비스의 가입번호,<br />
        비밀번호는 고객사의 사업자번호 입니다.
        <button type="button" @click="openModal">
          <span>가입번호 확인방법</span>
          <icon
            name="arrow-r__line--4c8"
            width="6"
            height="10"
            alt=""
            class="ml-2"
          />
        </button>
      </div>
    </div>
    <common-modal
      v-model="guidePopupShow"
      title="가입번호 확인방법"
      class="login-p"
      :size="MODAL_SIZE.LARGE"
    >
      <template #content>
        <icon
          name="guide"
          width="818px"
          height="554px"
          alt="가입번호는 이메일 또는 지로 청구서에 12자리 숫자로 표기되어 있습니다."
        />
      </template>
      <template #footer>
        <button
          type="button"
          class="btn__full--primary-md"
          @click="handleCancel"
        >
          확인
        </button>
      </template>
    </common-modal>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
name: login
meta:
  layout: login
  isPublicPath: true
</route>
