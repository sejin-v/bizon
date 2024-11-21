<script lang="ts" setup>
import dayjs from 'dayjs';
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
    const result = await request.get('/bizon/api/icsp/status', {
      headers: {
        'X-COMMAND': 'P07005',
      },
    });
    return result.data.data;
  } catch (error: any) {
    console.error(error);
    if (error.code === '30001803') confirmOpen('증속 신청 대상건이 없습니다.');
    return {
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
      rqstAbleYn: 'N',
      rqstUnableRsn: '',
      bizEmpNm: '',
      bizEmpHpno: '',
      bizEmpEmalAddr: '',
      trfEvetOccrYn: '',
    };
  }
};

const confirmOpen = async (message: any) => {
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
    const result = await request.post(
      '/bizon/api/icsp/request',
      {
        ...data,
      },
      {
        headers: {
          'X-COMMAND': 'P07101',
        },
      }
    );
    await confirmOpen(
      h('p', null, [
        h('div', { style: 'text-align: center;' }, '속도변경 신청 접수가'),
        h('div', { style: 'text-align: center;' }, '완료 되었습니다.'),
      ])
    );
    applyPopupShow.value = false;
    const apply = await getApplyData();
    applyData.value = apply;
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
  satisfactionPopupShow.value = true;
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
    await request.post('/bizon/api/survey/submit', data, {
      headers: {
        'X-COMMAND': 'P07102',
      },
    });
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

  applyData.value = result;
});
</script>

<template>
  <div class="box--fff apply">
    <h2 class="title">비즈온 증속신청</h2>
    <p class="title--sm">상세정보</p>
    <ul class="apply__info">
      <li>
        <label>서비스</label>
        <div>{{ applyData.svcNm ? applyData.svcNm : '' }}</div>
      </li>
      <li>
        <label>고객번호(가입번호)</label>
        <div>{{ applyData.entrNo ? applyData.entrNo : '' }}</div>
      </li>
      <li>
        <label>고객사명</label>
        <div class="flex flex-col !items-start">
          <p>
            {{ applyData.cucoNm ? applyData.cucoNm : '' }}
          </p>
          <p v-if="applyData.cucoNm">
            ({{
              userStore.user?.brno
                ? userStore.user?.brno
                : userStore.user?.brno
            }})
          </p>
        </div>
      </li>
      <li>
        <label>서비스 개통일자</label>
        <div>
          {{ applyData.cntcStrtDt ? dateFormatter(applyData.cntcStrtDt) : '' }}
        </div>
      </li>
      <li>
        <label>기본 제공 속도</label>
        <div class="flex-col !items-start justify-center">
          <p class="flex items-center">
            <span>
              업로드 {{ applyData.sbscUpldSped ? applyData.sbscUpldSped : 0 }}
            </span>
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="ml-2.5"
            />
          </p>
          <p class="flex items-center">
            다운로드 {{ applyData.sbscDownSped ? applyData.sbscDownSped : 0 }}
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
            업로드
            {{
              applyData.occrTrfUpldSpedVlue ? applyData.occrTrfUpldSpedVlue : 0
            }}
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="ml-2.5"
            />
          </p>
          <p class="flex items-center">
            다운로드
            {{
              applyData.occrTrfDownSpedVlue ? applyData.occrTrfDownSpedVlue : 0
            }}
            <icon
              name="triangle__full--525"
              width="11"
              height="9"
              alt=""
              class="rotate-180 ml-2.5"
            />
          </p>
          기준 일자:
          {{
            applyData.trfEvetOccrBaseDttm
              ? dayjs(applyData.trfEvetOccrBaseDttm).format(
                  'YYYY-MM-DD HH시 mm분'
                )
              : ''
          }}
        </div>
      </li>
      <li>
        <label>상태</label>
        <div v-if="applyData.trfEvetOccrYn">
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
        <label>증속 신청 가능 기한</label>
        <div class="flex flex-col !items-start">
          {{
            applyData.icspRqstDdayDt
              ? `${dateFormatter(applyData.icspRqstDdayDt)} 23시 59분`
              : ''
          }}
          <p v-if="applyData.icspRqstDdayDt">
            기본 속도 80% 초과한 날로부터 5일 이내
          </p>
        </div>
      </li>
      <li>
        <label>비고</label>
        <div>
          {{ applyData.rqstUnableRsn ? applyData.rqstUnableRsn : '' }}
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
          업로드/다운로드 1G를 초과하는 속도는 증속 신청 불가합니다. 1G 이상의
          속도를 원하실 경우 ‘비즈온' 이 아닌 ‘비즈넷'으로 신청하시기 바랍니다.
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
        <div>
          <p>
            원할한 서비스 운영을 위해 기본 제공 속도의 80%를 초과한 날로부터
            5일이 경과한 경우 증속신청은 제한됩니다.
          </p>
          <p>
            아울러 안정적인 인터넷 회신 서비스 제공을 위해 증속신청은 최대
            월1회, 연간 2회 가능합니다.
          </p>
        </div>
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
          :bizEmpHpno="applyData.bizEmpHpno"
          :bizEmpNm="applyData.bizEmpNm"
          :bizEmpEmalAddr="applyData.bizEmpEmalAddr"
        />
      </template>
    </common-modal>
    <!-- 고객만족도 조사 팝업 -->
    <common-modal
      v-if="satisfactionPopupShow"
      v-model="satisfactionPopupShow"
      title="고객 만족도 조사"
      :size="MODAL_SIZE.LARGE"
      :closeOnClickModal="false"
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
