<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { KEY_SAVED_ID, KEY_SEAVED_ID_YN } from '~/config';
import { IToastType } from '~/example/types/toast'
import { MODAL_SIZE } from '~/types/modal'

interface ILoginForm {
  email: string
  password: string
}
interface ILoginParams {
  data: ILoginForm
}

const router = useRouter()
const { setUser } = useUserStore()

const loginForm = reactive<ILoginForm>({
  email: '',
  password: '',
})

const confirmOption = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: true,
})

const popup = reactive({
  show: false,
  title: '약관 동의'
})

const toastOption = {
  message: '로그인 되었습니다.',
  type: IToastType.SUCCESS,
  showClose: false,
}

const savedUserIdYn = ref('N')

// 아이디 기억하기 여부에 따른 아이디 값 저장
watch(savedUserIdYn, () => {
  if (savedUserIdYn.value === 'N') {
    localStorage.removeItem(KEY_SAVED_ID)
  }

  localStorage.setItem(KEY_SEAVED_ID_YN, savedUserIdYn.value)
})

// 로그인 전 validation 체크 실행
const doValidProcess = () => {
  return loginForm.email && loginForm.password
}

const getClearParams = (loginForm: ILoginForm): ILoginParams => {
  return {
    data: {
      email: loginForm.email,
      password: loginForm.password,
    },
  }
}

// 로그인 실행
const doLoginProcess = async (data: ILoginParams) => {
  try {
    const result = await request.post(
      '/auth/sign-in/password',
      data,

    )

    return result.data.data
  }
  catch (e: any) {
    console.error(e)
    return e.response.data.responseMessage
  }
}

// 로그인 실패 시 입력 영역 초기화
const resetForm = () => {
  if (localStorage.getItem(KEY_SAVED_ID) && localStorage.getItem(KEY_SEAVED_ID_YN) === 'Y') {
    loginForm.email = localStorage.getItem(KEY_SAVED_ID) ?? ''
    savedUserIdYn.value = localStorage.getItem(KEY_SEAVED_ID_YN) ?? 'Y'
  }
  else {
    loginForm.email = ''
    savedUserIdYn.value = 'N'
  }
  loginForm.password = ''
}

// 로그인 버튼 클릭
const handleLoginBtnClick = async () => {
  const isValidationPass = doValidProcess()

  if (!isValidationPass) {
    confirmOption.content = '정보를 입력하지 않았습니다. 다시 확인하세요.'
    openConfirm(confirmOption)

    return
  }

  try {
    const params = getClearParams(loginForm)
    const response = await doLoginProcess(params)
    if (typeof response === 'string') {
      if (response === 'no user') {
        confirmOption.content = '입력하신 계정이 정지되었거나 존재하지 않습니다. 관리자에게 문의하세요'
      }
      else {
        confirmOption.content = '아이디 또는 비밀번호를 다시 확인하세요.'
      }

      resetForm()
      openConfirm(confirmOption)
    }
    else {
      if (savedUserIdYn.value === 'Y') {
        localStorage.setItem(KEY_SAVED_ID, loginForm.email)
      }
      setUser(response)
      setToken({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      })
      popup.show = true
    }
  }
  catch (e) {
    throw new Error('Failed to login')
  }
}

// 약관 동의 팝업 취소 버튼 클릭
const handleAgreeCancelBtnClick = () => {
  popup.show = false
}

// 약관 동의 팝업 동의 버튼 클릭 
const handleAgreeBtnClick = () => {
  popup.show = false
  openToast(toastOption)
  // let redirectUrl = router.currentRoute.value.query.redirectTo as string
  // if (!redirectUrl) redirectUrl = '/'
  router.push('/mgmt/project')
}

// 아이디 기억하기 여부에 따른 아이디 값 초기 셋팅
const init = () => {
  const isSavedUserId = localStorage.getItem(KEY_SEAVED_ID_YN)
  if (isSavedUserId) {
    const savedUserId = localStorage.getItem(KEY_SAVED_ID)

    if (!savedUserId) {
      return
    }

    savedUserIdYn.value = isSavedUserId
    loginForm.email = savedUserId
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="login">
    <div>
      <div class="login-box">
        <h1 class="flex justify-center">
          <icon name="logo__studio" width="163" height="37" alt="익시 스튜디오 로그인 페이지" />
        </h1>
        <div class="flex">
          <icon name="holeman__login" width="209" height="317" alt="" />
          <div class="login-box__form">
            <div class="flex flex-col justify-center flex-1">
              <!-- <div class="form">
              <label class="form__label">소속 ID</label>
              <CustomInput v-model:model-value="loginForm.departmentId" placeholder="소속ID를 입력하세요."
                prefix-icon="briefcase__full--a5a" />
            </div> -->
              <div class="form">
                <label class="form__label">아이디</label>
                <CustomInput v-model:model-value="loginForm.email" placeholder="아이디를 입력하세요."
                  prefix-icon="user__full--a5a" />
              </div>
              <div class="form">
                <label class="form__label">비밀번호</label>
                <CustomInput v-model:model-value="loginForm.password" placeholder="비밀번호를 입력하세요." type="password"
                  prefix-icon="lock__full--a5a" @keydown.prevent.enter="handleLoginBtnClick" />
              </div>
              <div class="justify-end form">
                <el-checkbox v-model:model-value="savedUserIdYn" true-value="Y" false-value="N">
                  아이디 기억하기
                </el-checkbox>

              </div>
            </div>
            <button type="button" class="btn__primary--lg" @click="handleLoginBtnClick">
              로그인
            </button>
          </div>
        </div>
      </div>
      <ul class="login-desc">
        <li>- <a class="table__underline" href="/home">메인으로</a></li>
        <li>- 아이디와 비밀번호 입력 시 계정은 대소문자로 구분하여야 합니다.</li>
        <li>- 현재 버전은 Open Beta 버전입니다.</li>
        <li>
          - 회원가입은 해당 컨플루언서 페이지 참고 부탁드립니다. - <a class="table__underline"
            href=" https://confluence.dx.lguplus.co.kr/pages/viewpage.action?pageId=322261837">페이지바로가기</a>
        </li>
        <li>- 기타 문의사항은 관리자에게 문의 하시기 바랍니다.<em> 한규호 (010-2378-1791, ixistudio@lguplus.co.kr)</em></li>
      </ul>
    </div>
  </div>
  <common-modal v-model="popup.show" :title="popup.title" :size="MODAL_SIZE.MEDIUM">
    <template #content>
      <div class="login-popup">
        <p>
          (개인정보에 대한 안내) ChatGPT에 개인정보 입력 시, 해당 개인정보가 당사를 통해 Open AI사의 해외서버에 저장될 수 있으므로 답변에 필요한 최소한의 정보를 입력하시기 바랍니다.<br>
        </p>
        <p>
          (영업비밀 유출에 대한 안내) ChatGPT에 당사의 영업비밀이 입력되는 경우, 해당 영업비밀이 Open AI사의 해외서버에 저장될 수 있고, 해당 정보는 회수가 불가능하며 이로 인해 회사에 막대한
          손해를 입힐 우려가 있으므로 절대로 영업비밀을 입력하지 마시기 바랍니다.<br>
        </p>
        <p>
          (저작권 위반 여부에 대한 안내) ChatGPT를 통해 생성되는 컨텐츠를 활용하고자 하는 경우, 반드시 저작권 등 위반여부에 대해 사전 확인하시기 바랍니다.<br>
        </p>
        <p>
          (민∙형사상 책임) 위와 같은 주의사항을 위반하는 경우 개인정보보호법, 부정경쟁방지 및 영업비밀보호에 관한 법률 등에 따라 민∙형사상 책임을 부담할 수 있으니 유의하시기 바랍니다. <br>
        </p>
        <p>
          위 사항에 동의합니다.
        </p>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleAgreeCancelBtnClick">
        취소
      </button>
      <button type="button" class="btn__secondary--md" @click="handleAgreeBtnClick">
        동의
      </button>
    </template>
  </common-modal>
</template>

<style scoped lang="scss">
@import "~/styles/pages/login";
</style>

<route lang="yaml">
meta:
  layout: empty
</route>
