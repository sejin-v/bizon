<script setup lang="ts">
import { KEY_SAVED_ID, KEY_SEAVED_ID_YN } from '~/config';
import { IToastType, MODAL_SIZE, ILoginForm, ILoginParams } from '~/types';

const router = useRouter();
const { setUser } = useUserStore();

// const loginForm = reactive<ILoginForm>({
//   email: '',
//   password: '',
// });

const userId = ref('');
const password = ref('');
const rememberId = ref('N');
const guidePopupShow = ref(false);
const savedUserIdYn = ref('N');

const confirmOption = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: true,
});

// 아이디 기억하기 여부에 따른 아이디 값 초기 셋팅
const checkRemeberLoginData = () => {
  const isSavedUserId = localStorage.getItem(KEY_SEAVED_ID_YN);
  if (isSavedUserId) {
    const savedUserId = localStorage.getItem(KEY_SAVED_ID);

    if (!savedUserId) {
      return;
    }

    savedUserIdYn.value = isSavedUserId;
    // loginForm.email = savedUserId;
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

const getParams = (): ILoginForm => {
  return {
    userId: userId.value,
    password: password.value,
  };
};

// 로그인 실행
const fetchLogin = async (data: ILoginForm) => {
  try {
    const result = await request.get('/mock/api/login', { data });
    return result.data;
  } catch (e: any) {
    throw e;
  }
};

const getUserData = async () => {
  try {
    const result = await request.get('/mock/api/getUser');
    return result.data;
  } catch (e: any) {
    throw e;
  }
};
// 로그인 실패 시 입력 영역 초기화
const resetForm = () => {
  // if (
  //   localStorage.getItem(KEY_SAVED_ID) &&
  //   localStorage.getItem(KEY_SEAVED_ID_YN) === 'Y'
  // ) {
  //   loginForm.email = localStorage.getItem(KEY_SAVED_ID) ?? '';
  //   savedUserIdYn.value = localStorage.getItem(KEY_SEAVED_ID_YN) ?? 'Y';
  // } else {
  //   loginForm.email = '';
  //   savedUserIdYn.value = 'N';
  // }
  // loginForm.password = '';
};

// 로그인 버튼 클릭
const handleLogin = async () => {
  if (!validateLogin()) {
    confirmOpen('아이디 또는 비밀번호를 입력하세요.');
    // confirmOption.content = '아이디 또는 비밀번호를 입력하세요.';
    // try {
    //   await openConfirm(confirmOption);
    // } catch (error) {}
    return;
  }

  // try {
  const params = getParams();
  try {
    await fetchLogin(params);
    const result = await getUserData();
    setUser(result);
    router.push('/apply');
  } catch (error) {
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

onMounted(() => {
  checkRemeberLoginData();
});

function openModal() {
  guidePopupShow.value = true;
}
function handleCancel() {
  guidePopupShow.value = false;
}

const gofindPwPage = () => {
  router.push('login/findPw');
};

// const popup = reactive({
//   show: false,
//   title: '약관 동의',
// });

// 아이디 기억하기 여부에 따른 아이디 값 저장
// watch(savedUserIdYn, () => {
//   if (savedUserIdYn.value === 'N') {
//     localStorage.removeItem(KEY_SAVED_ID);
//   }

//   localStorage.setItem(KEY_SEAVED_ID_YN, savedUserIdYn.value);
// });

// const guidePopup: IModalPopup = reactive({
//   guideConfirmPhoneNm: {
//     show: false,
//   },
// });
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
            <el-checkbox v-model="rememberId" true-value="Y" false-value="N">
              아이디 기억하기
            </el-checkbox>
            <a href="javascript:void(0);" @click="gofindPwPage"
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
          <span>고객번호 확인방법</span>
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
      title="고객번호 확인방법"
      class="login-p"
      :size="MODAL_SIZE.LARGE"
    >
      <template #content>
        <!-- TODO 퍼블 : 이미지 전달받아 넣기 -->
        <icon
          name=""
          width="818px"
          height="554px"
          alt="고객번호는 이메일 또는 지로 청구서에 12자리 숫자로 표기되어 있습니다."
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
</route>
