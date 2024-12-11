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
    <div class="flex flex-col title">
      <em class="!font-bold">무료</em>
      <h2>비즈온 증속 신청</h2>
      <div :class="{ 'flex items-start justify-between': !isMobile }">
        <div>
          <p class="mt-5 text-left title__desc !text-gray-500">
            기본 제공속도의 80% 초과 시 더 빠른 속도로 인터넷을 이용할 수
            있습니다.
          </p>
          <div>
            <button
              type="button"
              :class="{
                'w-full mt-5': isMobile,
                'btn__full--primary-md  !text-base':
                  applyData.rqstStusCd === 'Y',
                'btn__full--pending-md  !text-base':
                  applyData.rqstStusCd === 'P',
                'btn__full--negative-md !text-base ':
                  applyData.rqstStusCd === 'N',
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
              class="mt-2 text-left title__desc !text-gray-500 !text-xs"
            >
              {{ applyData.rqstUnableRsn ? applyData.rqstUnableRsn : '' }}
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <p class="title--sm !font-bold">이용 정보</p>
    <ul class="apply__info">
      <li>
        <label>요금제</label>
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
        <label>개통일</label>
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
        <label>증속 신청 기한</label>
        <div class="flex flex-col !items-start">
          <p>
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
            <em>신청 조건</em>
          </p>
          <ul class="list__depth">
            <li>
              <p class="list__2depth">
                인터넷 사용 속도가 요금제 기본 제공 속도의 80% 초과하면 신청할
                수 있어요 <br />
                (예시) 요금제 기본 제공 속도가 업로드 100Mbps, 다운로드
                200Mbps라면 사용 속도가 업로드 80Mbps 이상, 다운로드 160Mbps
                이상일 때 신청 가능
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
            <em>신청 기한</em>
          </p>
          <ul class="list__depth">
            <li>
              <p class="list__2depth">
                기본 제공 속도의 80%를 넘은 날로부터
                <em>5일 동안 신청</em>할 수 있어요.
              </p>
            </li>
            <li>
              <p class="list__2depth">
                안정적인 서비스 운영을 위해 5일이 지나면 신청할 수 없어요.
              </p>
            </li>
            <li>
              <p class="list__2depth">
                증속이 적용된 날로부터
                <em>10일 동안 추가 요금 없이</em>, 더 빠른 속도로 이용할 수
                있어요.
              </p>
            </li>
            <li>
              <p class="list__2depth">
                무료 증속 기간 10일이 지난 후에 계속 빠른 속도로 인터넷을
                이용하고 싶다면,
                <em>담당 영업사원에게 속도 변경 청약을 신청해 주세요.</em>
              </p>
            </li>
          </ul>
        </li>
        <li class="flex flex-col">
          <p class="flex items-center">
            <em>꼭 확인하세요</em>
          </p>
          <ul class="list__depth">
            <li>
              <p class="list__2depth">
                최대 1Gbps까지 증속할 수 있기 떄문에, Premium 요금제의 1Gbps를
                이용하고 있다면 증속을 신청할 수 없어요. 더 빠른 속도로 인터넷을
                이용하고 싶다면, '비즈넷' 서비스로 변경해 주세요.
                <br />
                - <em> 업로드 속도는 100Mbps 단위로 증속</em>할 수 있어요.
                <br />
                - <em> 다운로드 속도는 </em>Basic 요금제를 이용하고 있다면<em>
                  200Mbps에서 500Mbps로</em
                >
                , Standard 요금제를 이용하고 있다면
                <em> 500Mbps에서 1Gbps로 증속</em>할 수 있어요.
              </p>
            </li>
            <li>
              <p class="list__2depth">증속 신청은 1년 2번, 월 1회 가능해요.</p>
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
