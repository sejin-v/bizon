<script lang="ts" setup>
import HighlightTextarea from '~/components/HighlightTextarea.vue';

const highlightText = ref('{user} query')
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Highlight Text
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        중괄호로 둘러싸인 글자 색 변경
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <HighlightTextarea v-model="highlightText" />
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <HighlightTextarea v-model="highlightText" disabled />
      </div>
      <div class="form">
        <label class="form__label">Readonly</label>
        <HighlightTextarea v-model="highlightText" readonly />
      </div>
    </div>
  </div>
</template>