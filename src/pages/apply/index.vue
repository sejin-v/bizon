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
  rqstStusCd: 'N',
  rqstUnableRsn: '',
  bizEmpNm: '',
  bizEmpHpno: '',
  bizEmpEmalAddr: '',
  trfEvetOccrYn: '',
});
const breakpoints = useBreakpoints({
  mobile: 480,
});
const isMobile = breakpoints.smaller('mobile');
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
      rqstStusCd: 'N',
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
  if (applyData.value.rqstStusCd !== 'Y') return;
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

const brnoFormat = (brno: string) => {
  const brnoString = brno.toString();
  return (
    brnoString.slice(0, 3) +
    '-' +
    brnoString.slice(3, 5) +
    '-' +
    brnoString.slice(5)
  );
};
onMounted(async () => {
  const result = await getApplyData();
  applyData.value = result;
});
</script>

<template>
  <div class="box--fff apply">
    <div :class="{ 'flex items-end justify-between': !isMobile }">
      <div class="flex flex-col title">
        <em>무료 제공</em>
        <h2>비즈온 증속신청</h2>
        <p class="mt-5 text-left title__desc !text-gray-500">
          기본 제공속도의 80% 초과 시 더 빠른 속도로 인터넷을 이용할 수
          있습니다.
        </p>
      </div>
      <div style="margin-bottom: 40px">
        <button
          type="button"
          :class="{
            'w-full': isMobile,
            'btn__full--primary-sm': applyData.rqstStusCd === 'Y',
            'btn__full--pending-sm': applyData.rqstStusCd === 'P',
            'btn__full--negative-sm': applyData.rqstStusCd === 'N',
          }"
          :disabled="applyData.rqstStusCd === 'N'"
          @click="handleApplyButton"
        >
          {{
            applyData.rqstStusCd === 'Y'
              ? '신청하기'
              : applyData.rqstStusCd === 'P'
                ? '이미 사용 중입니다.'
                : '신청할 수 없습니다.'
          }}
        </button>
        <p
          v-if="applyData.rqstStusCd === 'N'"
          style="font-size: 90%"
          class="text-gray-500"
        >
          {{ applyData.rqstUnableRsn ? applyData.rqstUnableRsn : '' }}
        </p>
      </div>
    </div>
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
        <label>고객사명(사업자번호)</label>
        <div class="flex flex-col !items-start">
          <p>
            {{ applyData.cucoNm ? applyData.cucoNm : '' }}
          </p>
          <p v-if="applyData.cucoNm">
            ({{ userStore.user?.brno ? brnoFormat(userStore.user?.brno) : '' }})
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
          <p style="font-size: 90%">
            *기준 일자:
            {{
              applyData.trfEvetOccrBaseDttm
                ? dayjs(applyData.trfEvetOccrBaseDttm).format(
                    'YYYY-MM-DD HH시 mm분'
                  )
                : ''
            }}
          </p>
        </div>
      </li>
      <li>
        <label>상태</label>
        <div v-if="applyData.trfEvetOccrYn">
          {{
            applyData.trfEvetOccrYn === 'Y'
              ? applyData.occrTrfDivsCd === '01'
                ? '(업로드) 기본 제공 속도의 80% 초과'
                : applyData.occrTrfDivsCd === '02'
                  ? '(다운로드) 기본 제공 속도의 80% 초과'
                  : applyData.occrTrfDivsCd === '03'
                    ? '(업로드/다운로드) 기본 제공 속도의 80% 초과'
                    : ''
              : '정상'
          }}
        </div>
      </li>
      <!-- <li>
        <label>임시증속 신청가능 여부</label>
        <div
          :class="
            applyData.rqstStusCd === 'Y'
              ? 'apply__info--success'
              : 'apply__info--fail'
          "
        >
          {{ applyData.rqstStusCd === 'Y' ? '가능' : '불가' }}
        </div>
      </li>
      <li>
        <label>임시증속 신청하기</label>
        <div>
          <button
            type="button"
            class="btn__full--primary-sm"
            :disabled="applyData.rqstStusCd === 'N'"
            @click="handleApplyButton"
          >
            신청하기
          </button>
        </div>
      </li> -->
      <li>
        <label>증속 신청 가능 기한</label>
        <div class="flex flex-col !items-start">
          <p style="color: var(--color-primary-800)">
            {{
              applyData.icspRqstDdayDt
                ? `${dateFormatter(applyData.icspRqstDdayDt)} 23시 59분`
                : ''
            }}
          </p>
          <p v-if="applyData.icspRqstDdayDt" style="font-size: 90%">
            *기본 속도 80% 초과한 날로부터 5일 이내
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

    <p class="title--sm mt-8">사용안내</p>
    <div style="background-color: #f5f8fe">
      <ul class="list">
        <li class="flex-col">
          <p class="flex items-center">
            <!-- <icon
              name="check-circle__line"
              width="16"
              height="16"
              alt=""
              aria-hidden="true"
              class="mr-2"
            /> -->
            <em>사용 조건</em>
          </p>
          <ul class="list__depth">
            <li>
              <p class="list__2depth">
                이용하고 계신 인터넷 사용 속도가 기본 제공 속도의 80%를 초과한
                경우 증속신청이 가능합니다.
              </p>
            </li>
          </ul>
        </li>
        <li class="flex flex-col">
          <p class="flex items-center">
            <!-- <icon
              name="check-circle__line"
              width="16"
              height="16"
              alt=""
              aria-hidden="true"
              class="mr-2"
            /> -->
            <em>신청 가능기한 및 무료 사용 기간</em>
          </p>
          <ul class="list__depth">
            <li>
              <p class="list__2depth">
                기본 제공속도의 80%를 초과한 날로부터
                <em>5일동안 신청 가능</em> 합니다. <br />(안정적인 서비스 제공을
                위해 신청 가능한 날짜가 지난 후에는 증속 신청이 제한됩니다.)
              </p>
            </li>
            <li>
              <p class="list__2depth">
                증속이 완료 된 다음날로부터
                <em>10일간 무료로 사용</em>&nbsp;가능합니다.
                <br />
                (무료증속 제공 기간이 끝난 후 원래의 속도로 변경됩니다.)
              </p>
            </li>
            <li>
              <p class="list__2depth">
                계속 빠른 속도로 인터넷을 이용하고 싶으시다면,
                <em>담당 영업사원에게 속도 변경 청약을 신청</em>해 주세요.
              </p>
            </li>
          </ul>
        </li>
        <li class="flex flex-col">
          <p class="flex items-center">
            <!-- <icon
              name="check-circle__line"
              width="16"
              height="16"
              alt=""
              aria-hidden="true"
              class="mr-2"
            /> -->
            <em>유의 사항</em>
          </p>
          <ul class="list__depth">
            <li>
              <p class="list__2depth">
                업로드&#47;다운로드 최대 1G까지 증속가능하며, 1G를 초과하는
                속도를 원하실 경우 &#39;비즈넷&#39;으로 서비스 변경하시기
                바랍니다.
                <br />
                (기본 제공 속도에서
                <em
                  >업로드는 100M, 다운로드는 200M &#8594; 500M &#47; 500M
                  &#8594; 1G로 증속 가능</em
                >합니다.)
              </p>
            </li>
            <li>
              <p class="list__2depth">
                증속 신청은 최대 월 1회, 연간 2회 가능합니다
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

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
