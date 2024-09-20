<script setup lang="ts">
// ================ modal ================
import type { MessageOptions } from 'element-plus'
import Modal from '~/example/components/modal/Modal.vue'
import { MODAL_SIZE } from '~/types/modal'

// ================ Toast ================
import { IToastType } from '~/example/types/toast'
import type { IModalPopup } from '~/types/modal'
import DepthModal from '../components/modal/DepthModal.vue'

// ================ confirm ================
const basicConfirm = {
  content: '삭제하시겠습니까?',
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
}
const showTitleConfirm = {
  content: h('div', [
    h('p', '단일 content를 사용하면 적용되는 스타일입니다. 상세설명1 상세설명1'),
    h('p', '상세설명이 필요할 때는 p 태그를 사용합니다. 상세설명2 상세설명2'),
  ]), // content부분에 들어가는 내용을 적어주세요.
  title: 'title', // title 부분에 들어가는 내용을 적어주세요. 만약 title이 없다면,content 부분만 나옵니다.
  hideCancelButton: false, // cancelbutton 숨기는기능
  confirmButtonText: '확인', // 확인 버튼 텍스트 입니다.
  cancelButtonText: '취소', // 취소 버튼 텍스트 입니다.
  center: false, // content 가운데 정렬 여부 입니다.
  closeOnClickModal: true, // 모달창 외 버튼을 누르면 컨펌창이 꺼지는 기능입니다.
  closeOnPressEscape: true, // ESC버튼을 누르면 컨펌창이 꺼지는 기능 입니다.
  showClose: true, // X표시로 컨펌창을 끄는 기능 입니다.
}

const handleConfirm = () => {
  openConfirm(basicConfirm).then(() => {
  })
}
const handleShowTitleConfirm = () => {
  openConfirm(showTitleConfirm).then(() => {
  })
}
// ================ ref ==================
// TODO: Vue warn 방지
const pickItem = ref('')

// ================ Modal ================
const titleName = reactive({
  modalShow: 'basic',
  modalShowFooter: 'showFooter',
  modalShowTwoDepth: '2depth'
})

const popup: IModalPopup = reactive({
  modalShow: {
    show: false,
  },
  modalShowFooter: {
    show: false,
  },
  modalShowTwoDepth: {
    show: false,
  },
  modalShowList: {
    show: false,
  }
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
    <h2 class="text-3xl font-semibold">
      popup
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Basic Modal
      </mark>
      <div class="flex gap-3">
        <button type="button" class="btn__primary--sm" @click="openModal('modalShow')">
          basic
        </button>
        <button type="button" class="btn__primary--sm" @click="openModal('modalShowFooter')">
          showFooter
        </button>
        <button type="button" class="btn__primary--sm" @click="openModal('modalShowTwoDepth')">
          2depth
        </button>
      </div>

      <common-modal v-model="popup.modalShow.show" :title="titleName.modalShow" :size="MODAL_SIZE.MEDIUM"
        @confirm="handleCancel('modalShow')" @cancel="handleCancel('modalShow')">
        <template #content>
          <p>모달 내용</p>
        </template>
      </common-modal>

      <common-modal v-model="popup.modalShowFooter.show" :title="titleName.modalShowFooter" :size="MODAL_SIZE.XLARGE"
        @cancel="handleCancel('modalShowFooter')">
        <template #content>
          <p>모달 내용 </p>
        </template>
        <template #footer>
          <button type="button" class="btn__negative--md" @click="handleCancel('modalShowFooter')">
            취소(Footer)
          </button>
          <button type="button" class="btn__secondary--md" @click="handleConfirmBtn('modalShowFooter')">
            확인(Footer)
          </button>
        </template>
      </common-modal>

      <common-modal v-model="popup.modalShowTwoDepth.show" :title="titleName.modalShowTwoDepth"
        :size="MODAL_SIZE.XLARGE" @cancel="handleCancel('modalShowTwoDepth')">
        <template #content>
          <div class="form">
            <label class="form__label">label</label>
            <CustomInput v-model="pickItem" max-length="10" placeholder="데이터가 들어감" size="sm" disabled />
            <button type="button" class="btn__secondary--sm" @click="openModal('modalShowList')">
              Depth
            </button>
          </div>
          <DepthModal v-model="popup.modalShowList.show" title="타이틀" @confirm="handleConfirmBtn('modalShowList')"
            @cancel="handleCancel('modalShowList')" @pick-data="handlePickItem" />
        </template>
        <template #footer>
          <button type="button" class="btn__negative--md" @click="handleCancel('modalShowTwoDepth')">
            취소
          </button>
          <button type="button" class="btn__secondary--md" @click="handleConfirmBtn('modalShowTwoDepth')">
            확인
          </button>
        </template>
      </common-modal>
    </div>
    <hr>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Confirm
      </mark>
      <div class="flex gap-3">
        <button type="button" class="btn__primary--md" @click="handleConfirm">
          basic
        </button>
        <button type="button" class="btn__primary--md" @click="handleShowTitleConfirm">
          showTitle
        </button>
      </div>
    </div>
    <hr>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Toast
      </mark>
      <div>
        <el-button @click="handleToast1">
          일반 toast
        </el-button>
        <el-button @click="handleToast2">
          주의 toast
        </el-button>
        <el-button @click="handleToast3">
          성공 toast
        </el-button>
        <el-button @click="handleToast4">
          오류 toast
        </el-button>
      </div>
    </div>
    <hr>
  </div>
</template>

<style scoped></style>
