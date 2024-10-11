<script lang="ts" setup>
import { MODAL_SIZE } from '~/types';
import CustomTextarea from '~/example/components/custom-textarea/CustomTextarea.vue';
import { TApplyData } from '~/types';
const userStore = useUserStore();

const infoList = reactive([
  { label: '서비스', value: '비즈온 Standard', field: 'service', type: 'text' },
  {
    label: '고객번호',
    value: '******4567',
    field: 'customerNumber',
    type: 'text',
  },
  { label: '고객사명', value: 'AA반도체', field: 'customerName', type: 'text' },
  {
    label: '서비스 개통일자',
    value: '2023-07-25',
    field: 'startDate',
    type: 'text',
  },
  {
    label: '청약 트래픽',
    value1: '300M',
    value2: '500M',
    field: 'subscriptionTraffic',
    type: 'traffic',
  },
  {
    label: '발생 트래픽',
    value1: '300M',
    value2: '500M',
    field: 'generatedTraffic',
    type: 'traffic',
  },
  {
    label: '트래픽 상태',
    value: '임계치 초과',
    field: 'trafficStatus',
    type: 'text',
  },
  // FIXME :: 가능여부에 따른 클래스입니다. statusClass -  불가: apply__info--fail, 가능: apply__info--success
  {
    label: '임시증속 신청가능 여부',
    value: '불가',
    type: 'text',
    field: 'availability',
    statusClass: 'apply__info--fail',
  },
  { label: '임시증속 신청하기', field: '', type: 'button' },
  { label: '신청기한', value: '2024-05-10', field: 'limitDate', type: 'text' },
  {
    label: '비고',
    value: '불가사유..불가사유...',
    field: 'note',
    type: 'text',
  },
]);

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
const popup: IModalPopup = reactive({
  applyPopup: {
    show: false,
  },
  satisfactionPopup: {
    show: false,
  },
});
function openModal(modal: string) {
  popup[modal].show = true;
}
function handleCancel(modal: string) {
  popup[modal].show = false;
}

// 고객만족도 조사 팝업
const questions = reactive([
  { label: '비즈온 증속 서비스를 얼마나 만족하시나요?', type: 'rating' },
  {
    label: '트래픽 초과 알림 방식(문자/이메일)에 대해 얼마나 만족하시나요?',
    type: 'rating',
  },
  { label: '홈페이지를 통한 증속절차에 얼마나 만족하시나요?', type: 'rating' },
  {
    label:
      '증속 체험 후 실제 사용중인 서비스 속도를 변경 신청할 의향이 있으신가요?',
    type: 'rating',
  },
  {
    label: '(모바일 사용자 중) 모바일을 통한 서비스 신청에 만족하시나요?',
    type: 'rating',
  },
  {
    label:
      '더 나은 서비스를 위해 추가적으로 하고 싶은 말씀을 자유롭게 써주시기 바랍니다.',
    type: 'textarea',
  },
]);
const advice = ref('');
const score = ref<boolean>(true);

const getApplyData = async () => {
  try {
    const result = await request.get('/mock/api/getApply');
    console.log(result.data);
    applyData.value = result.data;
  } catch (error) {
    console.error(error);
  }
};
const scoreToggle = () => {
  score.value = !score.value;
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
      <li v-for="(item, index) in infoList" :key="index">
        <label>{{ item.label }}</label>
        <div
          :class="[
            { 'flex-col !items-start': item.type === 'traffic' },
            item.statusClass,
          ]"
        >
          <template v-if="item.type === 'text'">
            {{ item.value }}
          </template>
          <template v-else-if="item.type === 'traffic'">
            <p class="flex items-center">
              {{ item.value1 }}
              <icon
                name="triangle__full--525"
                width="11"
                height="9"
                alt=""
                class="ml-2.5"
              />
            </p>
            <p class="flex items-center">
              {{ item.value2 }}
              <icon
                name="triangle__full--525"
                width="11"
                height="9"
                alt=""
                class="rotate-180 ml-2.5"
              />
            </p>
          </template>
          <template v-else-if="item.type === 'button'">
            <button
              type="button"
              class="btn__full--primary-sm"
              @click="openModal('applyPopup')"
            >
              신청하기
            </button>
          </template>
        </div>
      </li>
      <li>
        <label>test</label>
        <div>123</div>
      </li>
      <li>
        <label>test</label>
        <div :class="['flex-col !items-start']">
          <p>text</p>
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
      v-model="popup.applyPopup.show"
      title="속도 변경 신청하기"
      class="apply-p"
      cancel-text="아니오, 변경하지 않습니다."
      confirm-text="네, 변경 하겠습니다."
      @cancel="openModal('satisfactionPopup')"
      @confirm="openModal('satisfactionPopup')"
    >
      <template #content>
        <p class="popup__desc--sm">
          <em>고객번호&#40;가입번호&#41;</em> 50000234567 의 속도가 아래와 같이
          변경됩니다.
        </p>
        <form class="form">
          <FormItem label="다운로드">
            <div class="box--f3f">
              <span>500M</span>
              <icon
                name="arrow-r__line--7f8"
                width="24"
                height="24"
                alt="변경 후"
              />
              <em>1G</em>
            </div>
          </FormItem>
          <FormItem label="업로드">
            <div class="box--f3f">
              <span>500M</span>
              <icon
                name="arrow-r__line--7f8"
                width="24"
                height="24"
                alt="변경 후"
              />
              <em>300M</em>
            </div>
          </FormItem>
          <FormItem label="속도 증속기간">
            <div class="box--f3f">증속 완료일부터 10일</div>
          </FormItem>
        </form>
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
              증속된 속도는 무상제공되며, 기존 사용중인 요금제와 동일하게
              과금합니다.
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
              증속 완료일로부터 10일 경과 후 원래 사용 중인 속도로 원상복구
              됩니다.
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
              증속 속도로 계속 사용원하시는 경우에는 영업
              담당자<u>&#40;김비즈&#47;010-8080-1234&#47;bizon&#64;lguplus.co.kr&#41;</u>께
              문의바랍니다.
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
              비밀번호로 생년월일, 주민등록번호 앞자리, 핸드폰 번호 등의
              개인정보는 사용하지 마십시오.
            </p>
          </li>
        </ul>
      </template>
    </common-modal>

    <!-- 고객만족도 조사 팝업 -->
    <common-modal
      v-model="popup.satisfactionPopup.show"
      title="고객 만족도 조사"
      :size="MODAL_SIZE.LARGE"
      class="satisfaction-p"
      cancel-text="다음에 참여할래요"
      confirm-text="참여하기"
      @cancel="handleCancel('satisfactionPopup')"
      @confirm="handleCancel('satisfactionPopup')"
    >
      <template #content>
        <p class="text-center popup__desc">
          저희 <em>BIZON Precare</em>를 이용해 주셔서 감사합니다.
        </p>
        <p class="text-center">
          최고 품질의 서비스를 제공드리고자 (고객만족도 조사)를 실시하고
          있습니다. 설문 결과는 향후 서비스 개선을 위해 활용될 예정이오니
          바쁘시더라도 잠시만 시간 내시어 많은 참여 부탁드립니다.
        </p>
        <ul class="box--f9f satisfaction-p__list">
          <li
            v-for="(question, index) in questions"
            :key="index"
            :class="{ 'flex-col !items-start': question.type === 'textarea' }"
          >
            <label>{{ index + 1 }}. {{ question.label }}</label>
            <template v-if="question.type === 'rating'">
              <div class="flex items-center space-x-[5px]">
                <button
                  v-for="i in 5"
                  :key="i"
                  type="button"
                  @click="scoreToggle"
                >
                  <!-- FIXME :: alt 값에 채워진 별의 갯수가 들어갈 수 있도록 요청 드립니다. -->
                  <!-- 분홍색별 아이콘: star__full--eb1, 회색별 아이콘:star__line--7f8 -->
                  <icon
                    :name="score ? 'star__full--eb1' : 'star__line--7f8'"
                    width="24"
                    height="24"
                    :alt="`${i}점`"
                  />
                </button>
              </div>
            </template>
            <template v-if="question.type === 'textarea'">
              <CustomTextarea
                v-model="advice"
                placeholder="100자 이내로 입력하세요."
                max-length="100"
                use-count
                class="mt-2.5"
              />
            </template>
          </li>
        </ul>
      </template>
    </common-modal>
  </div>
</template>

<style lang="scss"></style>
