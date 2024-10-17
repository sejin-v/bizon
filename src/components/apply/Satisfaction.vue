<script lang="ts" setup>
import CustomTextarea from '~/example/components/custom-textarea/CustomTextarea.vue';
import { IQuestionData } from '~/types';

// 고객만족도 조사 팝업
const questions = ref<IQuestionData[]>([]);

const getSurveyItems = async () => {
  const result = await request.get('/bizon/api/survey/items');
  return result.data.data;
};

const handleScore = (target: any, score: number) => {
  target.score = score;
};

const getSatisfactionData = () => {
  const question = JSON.parse(JSON.stringify(questions.value));

  const data = question.map((target: IQuestionData) => {
    return {
      evalQstnNo: target.evalQstnNo,
      evalQstnMtchYn: target.evalQstnMtchYn,
      [target.evalQstnMtchYn === 'N' ? 'evalAnsr' : 'evalScor']:
        target.evalQstnMtchYn === 'N'
          ? target.evalAnsr
          : target.evalQstnNo * 20,
    };
  });
  return {
    data,
  };
};

onMounted(async () => {
  const result = await getSurveyItems();
  questions.value = result;
});
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
      <li
        v-for="question in questions"
        :key="`question-${question.evalQstnNo}`"
        :class="{
          'flex-col !items-start': question.evalQstnMtchYn === 'N',
        }"
      >
        <template v-if="question.evalQstnMtchYn === 'Y'">
          <label>{{ question.evalQstnNo }}. {{ question.evalQstnCntn }}</label>
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
        </template>
        <template v-else>
          <label>{{ question.evalQstnNo }}. {{ question.evalQstnCntn }}</label>
          <CustomTextarea
            v-model="question.evalAnsr"
            placeholder="100자 이내로 입력하세요."
            max-length="100"
            use-count
            class="mt-2.5"
          />
        </template>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
