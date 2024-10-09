<script setup lang="ts">
const faqList = [
  {
    id: 1,
    title: '최대이십글최대이십글최대이십글자최대이십글자',
    date: '2024-09-09',
    content: '내용',
  },
  {
    id: 2,
    title: '증속서비스에 관한 규정안내',
    date: '2024-09-09',
    content: '안녕',
  },
];
const pageData = reactive({
  currentPage: 1,
  totalCount: 0,
});
// FIXME :: 모바일 해상도 대응
const breakpoints = useBreakpoints({
  mobile: 480,
});
const isMobile = breakpoints.smaller('mobile');
</script>

<template>
  <div class="faq-list">
    <div v-if="!isMobile" class="faq-list__header">
      <p>No</p>
      <p>제목</p>
      <p>등록일</p>
    </div>
    <el-collapse>
      <el-collapse-item
        v-for="(faq, index) in faqList"
        :key="`faq-list-${faq.id}`"
      >
        <template #title>
          <p v-if="!isMobile" class="faq-list__num">
            {{ index + 1 }}
          </p>
          <div class="faq-list__title-wrap">
            <p class="faq-list__title">
              {{ faq.title }}
            </p>
            <p class="faq-list__date">
              {{ faq.date }}
            </p>
          </div>
        </template>
        <div>{{ faq.content }}</div>
      </el-collapse-item>
    </el-collapse>
    <Pagination
      v-model="pageData.currentPage"
      :total-count="pageData.totalCount"
    />
  </div>
</template>
