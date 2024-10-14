<script lang="ts" setup>
// withDefaults(defineProps<{ entrNo: string }>(), {
//   entrNo: '',
// });
import CustomTextarea from '~/example/components/custom-textarea/CustomTextarea.vue';

// 고객만족도 조사 팝업
const questions = reactive([
  {
    label: '비즈온 증속 서비스를 얼마나 만족하시나요?',
    type: 'rating',
    score: 0,
  },
  {
    label: '트래픽 초과 알림 방식(문자/이메일)에 대해 얼마나 만족하시나요?',
    type: 'rating',
    score: 0,
  },
  {
    label: '홈페이지를 통한 증속절차에 얼마나 만족하시나요?',
    type: 'rating',
    score: 0,
  },
  {
    label:
      '증속 체험 후 실제 사용중인 서비스 속도를 변경 신청할 의향이 있으신가요?',
    type: 'rating',
    score: 0,
  },
  {
    label: '(모바일 사용자 중) 모바일을 통한 서비스 신청에 만족하시나요?',
    type: 'rating',
    score: 0,
  },
  // {
  //   label:
  //     '더 나은 서비스를 위해 추가적으로 하고 싶은 말씀을 자유롭게 써주시기 바랍니다.',
  //   type: 'textarea',
  //   score: 0,
  // },
]);
const advice = ref('');

const handleScore = (target: any, score: number) => {
  target.score = score;
  // score.value = !score.value;
};

const getSatisfactionData = () => {
  return {
    advice: advice.value,
  };
};
defineExpose({ getSatisfactionData });
</script>

<template>
  <div>
    <p class="text-center popup__desc">
      저희 <em>BIZON Precare</em>를 이용해 주셔서 감사합니다.
    </p>
    <p class="text-center">
      최고 품질의 서비스를 제공드리고자 (고객만족도 조사)를 실시하고 있습니다.
      설문 결과는 향후 서비스 개선을 위해 활용될 예정이오니 바쁘시더라도 잠시만
      시간 내시어 많은 참여 부탁드립니다.
    </p>
    <ul class="box--f9f satisfaction-p__list">
      <li v-for="(question, index) in questions" :key="`question-${index}`">
        <label>{{ index + 1 }}. {{ question.label }}</label>
        <div class="flex items-center space-x-[5px]">
          <button
            v-for="i in 5"
            :key="i"
            type="button"
            @click="handleScore(question, i)"
          >
            <icon
              :name="
                i <= question.score ? 'star__full--eb1' : 'star__line--7f8'
              "
              width="24"
              height="24"
              :alt="`${question.score}점`"
            />
          </button>
        </div>
      </li>
      <li class="flex-col !items-start">
        <label
          >{{ questions.length + 1 }}. 더 나은 서비스를 위해 추가적으로 하고
          싶은 말씀을 자유롭게 써주시기 바랍니다.</label
        >
        <CustomTextarea
          v-model="advice"
          placeholder="100자 이내로 입력하세요."
          max-length="100"
          use-count
          class="mt-2.5"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
