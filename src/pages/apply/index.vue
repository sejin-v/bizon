<script lang="ts" setup>
import { MODAL_SIZE } from '~/types';
import { IApplyData } from '~/types';

const applyData = ref<IApplyData>({
  entrNo: '',
  trfEvetOccrDt: '',
  svcNm: '',
  svcCd: '',
  cucoNm: '',
  cntcStrtDt: '',
  sbscUpldSped: '',
  sbscDownSped: '',
  occrTrfUpldSpedVlue: 0,
  occrTrfDownSpedVlue: 0,
  icspRqstDdayDt: '',
  rqstAbleYn: '',
  rqstUnableRsn: '',
  bizEmpNm: '',
  bizEmpHpno: '',
  bizEmpEmalAddr: '',
  trfEvetOccrYn: '',
});

const userStore = useUserStore();
// 팝업
const applyPopupShow = ref(false);
const satisfactionPopupShow = ref(false);
const satisfactionRef = ref();
const applyIncreaseRef = ref();

const confirmOption = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: true,
});

const getApplyData = async () => {
  try {
    const result = await request.get('/bizon/api/icsp/status');
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
};

const confirmOpen = async (message: string) => {
  confirmOption.content = message;
  try {
    await openConfirm(confirmOption);
  } catch (error) {}
};

const handleApplyButton = () => {
  applyPopupShow.value = true;
};

const handleConfirmApply = async () => {
  const data = applyIncreaseRef.value.getRequestData();
  try {
    const result = await request.post('/bizon/api/icsp/request', { ...data });
    await confirmOpen(result.data.message);
    applyPopupShow.value = false;
    const test = await getApplyData();
    applyData.value = test;
    satisfactionPopupShow.value = true;
  } catch (error: any) {
    console.error(error);
    await openConfirm({
      content: error.message,
      center: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      hideCancelButton: true,
    });
  }
};

const handleCancelApply = () => {
  applyPopupShow.value = false;
};

const handleConfirmSatisfaction = async () => {
  const result = satisfactionRef.value.getSatisfactionData();
  const data = {
    trfEvetOccrDt: applyData.value.trfEvetOccrDt, // 트래픽 이벤트 발생 일자
    occrTrfDivsCd: applyData.value.occrTrfDivsCd,
    satisfactionEvaluationResultList: [
      // 만족도 평가 결과 목록
      ...result.data,
    ],
  };
  try {
    await request.post('/bizon/api/survey/submit', data);
    satisfactionPopupShow.value = false;
  } catch (error: any) {
    console.error(error);
    openConfirm({
      content: error.message,
      center: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      hideCancelButton: true,
    });
  }
};

const handleCancelSatisfaction = () => {
  satisfactionPopupShow.value = false;
};
const kbToMb = (kb: number) => {
  return Math.floor(kb / 1024 / 1024);
};

onMounted(async () => {
  const result = await getApplyData();
  console.log(result);

  applyData.value = result;
  console.log(userStore);
});
</script>

<template>
  <div class="box--fff apply">
    <h2 class="title">비즈온 증속신청</h2>
    <p class="title--sm">상세정보</p>
    <ul class="apply__info">
      <li>
        <label>서비스</label>
        <div>{{ applyData.svcNm }}</div>
      </li>
      <li>
        <label>고객번호(가입번호)</label>
        <div>{{ applyData.entrNo }}</div>
      </li>
      <li>
        <label>고객사명</label>
        <div>{{ applyData.cucoNm }}({{ userStore.user?.brno }})</div>
      </li>
      <li>
        <label>서비스 개통일자</label>
        <div>{{ dateFormatter(applyData.cntcStrtDt) }}</div>
      </li>
      <li>
        <label>기본 제공 속도</label>
        <div class="flex-col !items-start">
          <p class="flex items-center">
            업로드 {{ applyData.sbscUpldSped }}M
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="ml-2.5"
            />
          </p>
          <p class="flex items-center">
            다운로드 {{ applyData.sbscDownSped }}M
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
        <label>사용 속도</label>
        <div class="flex-col !items-start">
          <p class="flex items-center">
            업로드 {{ applyData.occrTrfUpldSpedVlue }}M
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="ml-2.5"
            />
          </p>
          <p class="flex items-center">
            다운로드 {{ applyData.occrTrfDownSpedVlue }}M
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
        <label>상태</label>
        <div>
          {{
            applyData.trfEvetOccrYn === 'Y'
              ? '기본 제공 속도의 80% 초과'
              : '정상'
          }}
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
        <label>증속 신청 가능한 날짜</label>
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
        <div>
          <p>
            ‘비즈온’ 서비스를 사용 중이신 고객은 UP/DOWN 트래픽이 임계치 초과 시
            신청완료 일자 기준 10일동안 무상증속 이용 가능합니다.
          </p>
          <p>
            서비스 속도를 유지하고자 하실 경우 담당 영업사원을 통해 기한 내
            속도변경 청약 접수바랍니다.
          </p>
        </div>
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
        <apply-increase
          ref="applyIncreaseRef"
          :entrNo="applyData.entrNo"
          :svcCd="applyData.svcCd"
          :sbscDownSpedVlue="applyData.sbscDownSped"
          :sbscUpldSpedVlue="applyData.sbscUpldSped"
          :trfEvetOccrDt="applyData.trfEvetOccrDt"
          :occrTrfDivsCd="applyData.occrTrfDivsCd"
        />
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
        <apply-satisfaction ref="satisfactionRef" />
      </template>
    </common-modal>
  </div>
</template>

<style lang="scss"></style>
