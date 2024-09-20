<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';

const searchDate = ref('')
const dateButton = ref('')
const datePickerButton = ref('')
// const clickDateMode = ref('day')

const handleClickSetDay = () => {
  searchDate.value = ''
  // clickDateMode.value = 'day'
  const today = dayjs()
  searchDate.value = [today, today]
};

const handleClickSetWeek = () => {
  searchDate.value = ''
  // clickDateMode.value = 'week'
  const today = dayjs()
  const lastWeek = dayjs().subtract(6, 'day').endOf('day')
  searchDate.value = [lastWeek, today]
}

const handleClickSetMonth = () => {
  searchDate.value = ''
  // clickDateMode.value = 'month'
  const startDay = dayjs().startOf('day')
  const endDay = dayjs().subtract(30, 'day').endOf('day')
  searchDate.value = [endDay, startDay]
}

const handleClickDate = () => {
  searchDate.value = ''
  // clickDateMode.value = ''
}

onMounted(() => {
  handleClickSetDay()
})

const selectDate = () => {
  datePickerButton.value.selectDate();
};

const closeMenu = () => {
  datePickerButton.value.closeMenu();
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      date-picker
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        date-picker
      </mark>
      <div class="datepicker">
        <div class="datepicker__btns">
          <!-- :class="clickDateMode === 'day' ? 'btn__primary--sm' : 'btn__primary-line--sm'" -->
          <button type="button" @click="handleClickSetDay">일간</button>
          <!-- :class="clickDateMode === 'week' ? 'btn__primary--sm' : 'btn__primary-line--sm'" -->
          <button type="button" @click="handleClickSetWeek('week')">주간</button>
          <!-- :class="clickDateMode === 'month' ? 'btn__primary--sm' : 'btn__primary-line--sm'" -->
          <button type="button" @click="handleClickSetMonth">월간</button>
        </div>
        <VueDatePicker v-model="searchDate" ref="datePickerButton" format="yyyy-MM-dd" max-range="365" range locale="ko"
          :day-names="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']" :enable-time-picker="false" :yearFirst="true"
          placeholder="시작일 종료일을 입력해 주세요" @open="handleClickDate">
          <template #action-preview />
          <template #action-buttons ref="dateButton">
            <button type="button" class="btn__negative--sm" @click="closeMenu">취소</button>
            <button type="button" class="btn__primary--sm" @click="selectDate">선택</button>
          </template>
        </VueDatePicker>
      </div>
    </div>
    <hr>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
name: date-picker
meta:
  isPublicPath: true
</route>
