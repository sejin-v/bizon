<script lang="ts" setup>
import { MODAL_SIZE } from '~/types';
import { TApplyData } from '~/types';
import dayjs from 'dayjs';
const userStore = useUserStore();

// const infoList = reactive([
//   { label: '서비스', value: '비즈온 Standard', field: 'service', type: 'text' },
//   {
//     label: '고객번호',
//     value: '******4567',
//     field: 'customerNumber',
//     type: 'text',
//   },
//   { label: '고객사명', value: 'AA반도체', field: 'customerName', type: 'text' },
//   {
//     label: '서비스 개통일자',
//     value: '2023-07-25',
//     field: 'startDate',
//     type: 'text',
//   },
//   {
//     label: '청약 트래픽',
//     value1: '300M',
//     value2: '500M',
//     field: 'subscriptionTraffic',
//     type: 'traffic',
//   },
//   {
//     label: '발생 트래픽',
//     value1: '300M',
//     value2: '500M',
//     field: 'generatedTraffic',
//     type: 'traffic',
//   },
//   {
//     label: '트래픽 상태',
//     value: '임계치 초과',
//     field: 'trafficStatus',
//     type: 'text',
//   },
//   // FIXME :: 가능여부에 따른 클래스입니다. statusClass -  불가: apply__info--fail, 가능: apply__info--success
//   {
//     label: '임시증속 신청가능 여부',
//     value: '불가',
//     type: 'text',
//     field: 'availability',
//     statusClass: 'apply__info--fail',
//   },
//   { label: '임시증속 신청하기', field: '', type: 'button' },
//   { label: '신청기한', value: '2024-05-10', field: 'limitDate', type: 'text' },
//   {
//     label: '비고',
//     value: '불가사유..불가사유...',
//     field: 'note',
//     type: 'text',
//   },
// ]);

const applyData = ref<TApplyData>({
  id: '',
  customerNumber: 0,
  customerName: '',
  startDate: '',
  generatedTraffic: [0, 0],
  subscriptionTraffic: [0, 0],
  trafficStatus: '',
  availability: false,
  limitDate: '',
  note: '',
  service: '',
});
// 팝업
const applyPopupShow = ref(false);
const satisfaction = ref();
const satisfactionPopupShow = ref(false);
// const popup: IModalPopup = reactive({
//   applyPopup: {
//     show: false,
//   },
//   satisfactionPopup: {
//     show: false,
//   },
// });
// function openModal(modal: string) {
//   popup[modal].show = true;
// }
// function handleCancel(modal: string) {
//   popup[modal].show = false;
// }

// 고객만족도 조사 팝업
// const questions = reactive([
//   {
//     label: '비즈온 증속 서비스를 얼마나 만족하시나요?',
//     type: 'rating',
//     score: 0,
//   },
//   {
//     label: '트래픽 초과 알림 방식(문자/이메일)에 대해 얼마나 만족하시나요?',
//     type: 'rating',
//     score: 0,
//   },
//   {
//     label: '홈페이지를 통한 증속절차에 얼마나 만족하시나요?',
//     type: 'rating',
//     score: 0,
//   },
//   {
//     label:
//       '증속 체험 후 실제 사용중인 서비스 속도를 변경 신청할 의향이 있으신가요?',
//     type: 'rating',
//     score: 0,
//   },
//   {
//     label: '(모바일 사용자 중) 모바일을 통한 서비스 신청에 만족하시나요?',
//     type: 'rating',
//     score: 0,
//   },
//   {
//     label:
//       '더 나은 서비스를 위해 추가적으로 하고 싶은 말씀을 자유롭게 써주시기 바랍니다.',
//     type: 'textarea',
//     score: 0,
//   },
// ]);
// const advice = ref('');
// const score = ref<boolean>(true);

const getApplyData = async () => {
  try {
    const result = await request.get('/mock/api/speedup/status');
    console.log(result.data);
    applyData.value = result.data;
  } catch (error) {
    console.error(error);
  }
};

const handleApplyButton = () => {
  applyPopupShow.value = true;
};

const handleConfirmApply = () => {
  applyPopupShow.value = false;
  satisfactionPopupShow.value = true;
};

const handleCancelApply = () => {
  applyPopupShow.value = false;
};

const handleConfirmSatisfaction = () => {
  const result = satisfaction.value.getSatisfactionData();
  console.log(result);
  satisfactionPopupShow.value = false;
};

const handleCancelSatisfaction = () => {
  satisfactionPopupShow.value = false;
};
const kbToMb = (kb: number) => {
  return Math.floor(kb / 1024 / 1024);
};

const dateFormatter = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

onMounted(() => {
  getApplyData();
});
</script>

<template>
  <div class="box--fff apply">
    <h2 class="title">비즈온 증속 신청</h2>
    <p class="title--sm">상세정보</p>
    <ul class="apply__info">
      <li>
        <label>서비스</label>
        <div>{{ applyData.svcNm }}</div>
      </li>
      <li>
        <label>고객번호</label>
        <div>{{ applyData.entrNo }}</div>
      </li>
      <li>
        <label>고객사명</label>
        <div>{{ applyData.cucoNm }}</div>
      </li>
      <li>
        <label>서비스 개통일자</label>
        <div>{{ dateFormatter(applyData.cntcStrtDt) }}</div>
      </li>
      <li>
        <label>청약 트래픽</label>
        <div class="flex-col !items-start">
          <p class="flex items-center">
            {{ kbToMb(applyData.sbscUpldSped) }}M
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="ml-2.5"
            />
          </p>
          <p class="flex items-center">
            {{ kbToMb(applyData.sbscDownSped) }}M
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="rotate-180 ml-2.5"
            />
          </p>
        </div>
      </li>
      <li>
        <label>발생 트래픽</label>
        <div class="flex-col !items-start">
          <p class="flex items-center">
            {{ kbToMb(applyData.occrTrfUpldSpedVlue) }}M
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="ml-2.5"
            />
          </p>
          <p class="flex items-center">
            {{ kbToMb(applyData.occrTrfDownSpedVlue) }}M
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="rotate-180 ml-2.5"
            />
          </p>
        </div>
      </li>
      <li>
        <label>트래픽 상태</label>
        <div>
          {{ applyData.trfEvetOccrYn === 'Y' ? '임계치 초과' : '정상' }}
        </div>
      </li>
      <li>
        <label>임시증속 신청가능 여부</label>
        <div
          :class="
            applyData.rqstAbleYn === 'Y'
              ? 'apply__info--success'
              : 'apply__info--fail'
          "
        >
          {{ applyData.rqstAbleYn === 'Y' ? '가능' : '불가' }}
        </div>
      </li>
      <li>
        <label>임시증속 신청하기</label>
        <div>
          <button
            type="button"
            class="btn__full--primary-sm"
            :disabled="applyData.rqstAbleYn === 'N'"
            @click="handleApplyButton"
          >
            신청하기
          </button>
        </div>
      </li>
      <li>
        <label>신청기한</label>
        <div>
          {{ dateFormatter(applyData.icspRqstDdayDt) }}
        </div>
      </li>
      <li>
        <label>비고</label>
        <div>
          {{ applyData.rqstUnableRsn }}
        </div>
      </li>
    </ul>

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
        <p>
          ‘비즈온’ 서비스를 사용 중이신 고객은 UP/DOWN 트래픽이 임계치 초과 시
          신청완료 일자 기준 10일동안 무상증속 이용 가능합니다. 서비스 속도를
          유지하고자 하실 경우 담당 영업사원을 통해 기한 내 속도변경 청약
          접수바랍니다.
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
          Basic(Down속도 200M)/ Standard(Down속도 500M) 사용 고객만 사용
          가능하며, Premium(Down속도 1G) 사용 중이신 고객은 ‘비즈온＇이 아닌
          ‘비즈넷＇으로만 변경 가능합니다.
        </p>
      </li>
    </ul>

    <!-- 속도 변경 신청하기 팝업 -->
    <common-modal
      v-model="applyPopupShow"
      title="속도 변경 신청하기"
      class="apply-p"
      cancel-text="아니오, 변경하지 않습니다."
      confirm-text="네, 변경 하겠습니다."
      @cancel="handleCancelApply"
      @confirm="handleConfirmApply"
    >
      <template #content>
        <apply-increase :entrNo="applyData.entrNo" />
      </template>
    </common-modal>

    <!-- 고객만족도 조사 팝업 -->
    <common-modal
      v-model="satisfactionPopupShow"
      title="고객 만족도 조사"
      :size="MODAL_SIZE.LARGE"
      class="satisfaction-p"
      cancel-text="다음에 참여할래요"
      confirm-text="참여하기"
      @cancel="handleCancelSatisfaction"
      @confirm="handleConfirmSatisfaction"
    >
      <template #content>
        <apply-satisfaction ref="satisfaction" />
      </template>
    </common-modal>
  </div>
</template>

<style lang="scss"></style>
