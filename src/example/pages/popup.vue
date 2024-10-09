<script setup lang="ts">
// ================ modal ================
import type { MessageOptions } from 'element-plus'
import DepthModal from '../components/modal/DepthModal.vue'
import Modal from '~/example/components/modal/Modal.vue'
import { MODAL_SIZE } from '~/types/modal'

// ================ Toast ================
import { IToastType } from '~/example/types/toast'
import type { IModalPopup } from '~/types/modal'

// ================ confirm ================
const basicConfirm = {
  content: '삭제하시겠습니까?',
  cancelButtonText: '취소',
  confirmButtonText: '확인',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
}
const showTitleConfirm = {
  content: '설명문구를 입력해주세요',
  title: 'title', // title 부분에 들어가는 내용을 적어주세요. 만약 title이 없다면,content 부분만 나옵니다.
  hideCancelButton: false, // cancelbutton 숨기는기능
  confirmButtonText: '확인', // 확인 버튼 텍스트 입니다.
  cancelButtonText: '취소', // 취소 버튼 텍스트 입니다.
  center: false, // content 가운데 정렬 여부 입니다.
  closeOnClickModal: true, // 모달창 외 버튼을 누르면 컨펌창이 꺼지는 기능입니다.
  closeOnPressEscape: true, // ESC버튼을 누르면 컨펌창이 꺼지는 기능 입니다.
}

const handleConfirm = () => {
  openConfirm(basicConfirm).then(() => {})
}
const handleShowTitleConfirm = () => {
  openConfirm(showTitleConfirm).then(() => {})
}
// ================ ref ==================
// TODO: Vue warn 방지
const pickItem = ref('')

// ================ Modal ================
const titleName = reactive({
  modalShow: 'basic',
  noticeDetail: '고객번호 확인방법',
  applyPopup: '속도 변경 신청하기',
  modalShowTwoDepth: '2depth',
})

const popup: IModalPopup = reactive({
  modalShow: {
    show: false,
  },
  noticeDetail: {
    show: false,
  },
  applyPopup: {
    show: false,
  },
  modalShowTwoDepth: {
    show: false,
  },
  modalShowList: {
    show: false,
  },
})

function openModal(modal: string) {
  popup[modal].show = true
}
function handleCancel(modal: string) {
  popup[modal].show = false
}
function handleConfirmBtn(modal: string) {
  popup[modal].show = false
}
const handlePickItem = (data: any) => {
  pickItem.value = data.date
}

// ================ Toast ================
const options1: MessageOptions = {
  message: '일반 toast 예제입니다.',
  // type: undefined,
  showClose: true,
}

const options2: MessageOptions = {
  message: '주의 toast 예제입니다.',
  type: IToastType.WARNING,
  showClose: true,
}

const options3: MessageOptions = {
  message: '성공 toast 예제입니다.',
  type: IToastType.SUCCESS,
  showClose: false,
}

const options4: MessageOptions = {
  message: '오류 toast 예제입니다.',
  type: IToastType.ERROR,
  showClose: false,
}

const handleToast1 = () => {
  openToast(options1)
}

const handleToast2 = () => {
  openToast(options2)
}

const handleToast3 = () => {
  openToast(options3)
}

const handleToast4 = () => {
  openToast(options4)
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">popup</h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background: #f0e4ff"> Basic Modal </mark>
      <div class="flex flex-wrap gap-3">
        <button type="button" class="btn__line--primary-sm" @click="openModal('modalShow')">Basic</button>
        <button type="button" class="btn__line--primary-sm" @click="openModal('noticeDetail')">공지사항 상세</button>
        <button type="button" class="btn__line--primary-sm" @click="openModal('applyPopup')">속도 변경 신청하기</button>
        <!-- <button type="button" class="btn__line--primary-sm" @click="openModal('modalShowTwoDepth')">2depth</button> -->
      </div>

      <common-modal v-model="popup.modalShow.show" :title="titleName.modalShow" @confirm="handleCancel('modalShow')" @cancel="handleCancel('modalShow')">
        <template #content>
          <p>모달 내용</p>
        </template>
      </common-modal>

      <!-- 공지사항 상세 팝업 -->
      <common-modal v-model="popup.noticeDetail.show" title="증속서비스에 관한 규정 안내" desc="2024-09-09" :show-close="false">
        <template #content>
          1. 증속서비스는 트래픽 임계치(청약속도의 80%) 초과로 인한 고객 통지(문자/이메일) 후 5일 이내 신청가능합니다. <br />
          2. 안정적인 서비스 제공을 위해 5일 경과 후에는 증속 신청이 불가하오니 사용을 원하는 경우 즉시 사이트를 통해 신청하시기 바랍니다. <br />
          3. 증속서비스는 최대 10일 사용가능하며, 증속에 따른 추가요금은 발생하지 않습니다. <br />
          4. 증속서비스를 계속 사용원하실 경우 담당 영업사원을 통해 속도변경 통해 청약접수하시기 바랍니다. <br />
          5. 증속사용기간 10일 만료 후 청약속도로 원상복귀 됩니다.
        </template>
        <template #footer>
          <button type="button" class="btn__full--primary-md" @click="handleCancel('noticeDetail')">목록보기</button>
        </template>
      </common-modal>

      <!-- 속도 변경 신청하기 팝업 -->
      <common-modal
        v-model="popup.applyPopup.show"
        :title="titleName.applyPopup"
        :size="MODAL_SIZE.LARGE"
        class="apply-p"
        cancel-text="아니오, 변경하지 않습니다."
        confirm-text="네, 변경 하겠습니다."
        @cancel="handleCancel('applyPopup')"
        @confirm="handleConfirmBtn('applyPopup')"
      >
        <template #content>
          <p><em>고객번호&#40;가입번호&#41;</em> 50000234567 의 속도가 아래와 같이 변경됩니다.</p>
          <form class="form">
            <FormItem label="다운로드">
              <div class="box--f3f">
                <span>500M</span>
                <icon name="arrow-r__line--7f8" width="24" height="24" alt="" />
                <em>1G</em>
              </div>
            </FormItem>
            <FormItem label="업로드">
              <div class="box--f3f">
                <span>500M</span>
                <icon name="arrow-r__line--7f8" width="24" height="24" alt="" />
                <em>300M</em>
              </div>
            </FormItem>
            <FormItem label="속도 증속기간">
              <div class="box--f3f">증속 완료일부터 10일</div>
            </FormItem>
          </form>
          <ul class="list">
            <li>
              <icon name="check-circle__line" width="16" height="16" alt="" aria-hidden="true" class="mr-2" />
              <p>증속된 속도는 무상제공되며, 기존 사용중인 요금제와 동일하게 과금합니다.</p>
            </li>
            <li>
              <icon name="check-circle__line" width="16" height="16" alt="" aria-hidden="true" class="mr-2" />
              <p>증속 완료일로부터 10일 경과 후 원래 사용 중인 속도로 원상복구 됩니다.</p>
            </li>
            <li>
              <icon name="check-circle__line" width="16" height="16" alt="" aria-hidden="true" class="mr-2" />
              <p>증속 속도로 계속 사용원하시는 경우에는 영업 담당자<u>&#40;김비즈&#47;010-8080-1234&#47;bizon&#64;lguplus.co.kr&#41;</u>께 문의바랍니다.</p>
            </li>
            <li>
              <icon name="check-circle__line" width="16" height="16" alt="" aria-hidden="true" class="mr-2" />
              <p>비밀번호로 생년월일, 주민등록번호 앞자리, 핸드폰 번호 등의 개인정보는 사용하지 마십시오.</p>
            </li>
          </ul>
        </template>
      </common-modal>

      <!-- <common-modal v-model="popup.modalShowTwoDepth.show" :title="titleName.modalShowTwoDepth" :size="MODAL_SIZE.XLARGE" @cancel="handleCancel('modalShowTwoDepth')">
        <template #content>
          <div class="form">
            <label class="form__label">label</label>
            <CustomInput v-model="pickItem" max-length="10" placeholder="데이터가 들어감" size="sm" disabled />
            <button type="button" class="btn__secondary--sm" @click="openModal('modalShowList')">Depth</button>
          </div>
          <DepthModal v-model="popup.modalShowList.show" title="타이틀" @confirm="handleConfirmBtn('modalShowList')" @cancel="handleCancel('modalShowList')" @pick-data="handlePickItem" />
        </template>
        <template #footer>
          <button type="button" class="btn__negative--md" @click="handleCancel('modalShowTwoDepth')">취소</button>
          <button type="button" class="btn__secondary--md" @click="handleConfirmBtn('modalShowTwoDepth')">확인</button>
        </template>
      </common-modal> -->
    </div>
    <hr />

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background: #f0e4ff"> Confirm </mark>
      <div class="flex gap-3">
        <button type="button" class="btn__full--primary-sm" @click="handleConfirm">basic</button>
        <button type="button" class="btn__full--primary-sm" @click="handleShowTitleConfirm">showTitle</button>
      </div>
    </div>
    <hr />

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background: #f0e4ff"> Toast </mark>
      <div>
        <el-button @click="handleToast1"> 일반 toast </el-button>
        <el-button @click="handleToast2"> 주의 toast </el-button>
        <el-button @click="handleToast3"> 성공 toast </el-button>
        <el-button @click="handleToast4"> 오류 toast </el-button>
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped></style>
