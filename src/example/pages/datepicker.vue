<script setup lang="ts">
const value1 = ref('')
const value2 = ref('20240403')
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Datepicker
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        State
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <el-date-picker v-model="value1" type="date" placeholder="시작일" />
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <el-date-picker v-model="value2" type="date" placeholder="시작일" disabled />
      </div>
      <div class="form">
        <label class="form__label">Readonly</label>
        <el-date-picker v-model="value2" type="date" placeholder="시작일" readonly />
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        size (default, large)
      </mark>
      <div class="form">
        <label class="form__label">Default</label>
        <el-date-picker v-model="value1" type="date" placeholder="시작일" />
      </div>
      <div class="form">
        <label class="form__label">Large</label>
        <el-date-picker v-model="value1" type="date" placeholder="시작일" size="large" />
      </div>
    </div>
  </div>
</template>
