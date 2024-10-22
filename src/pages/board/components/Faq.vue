<script setup lang="ts">
const faqList = ref();
const pageData = reactive({
  currentPage: 1,
  totalCount: 0,
});
// FIXME :: 모바일 해상도 대응
const breakpoints = useBreakpoints({
  mobile: 480,
});
const isMobile = breakpoints.smaller('mobile');

const getParams = () => {
  return {
    atclKdCd: 'FAQ',
    page: pageData.currentPage,
    perPageNum: 10,
  };
};

const getFaqList = async (params) => {
  const result = await request.get('/bizon/api/board/list', {
    params,
  });
  return result.data.data;
};

const handleSearch = async () => {
  const params = getParams();
  const result = await getFaqList(params);
  faqList.value = result.articleList;
  pageData.totalCount = result.totalCount;
};

onMounted(async () => {
  handleSearch();
});
</script>

<template>
  <div class="faq-list">
    <div v-if="!isMobile" class="faq-list__header">
      <p>No</p>
      <p>제목</p>
      <p>등록일</p>
    </div>
    <el-collapse>
      <el-collapse-item v-for="faq in faqList" :key="`faq-list-${faq.atclSno}`">
        <template #title>
          <p v-if="!isMobile" class="faq-list__num">
            {{ faq.rowNum }}
          </p>
          <div class="faq-list__title-wrap">
            <p class="faq-list__title">
              {{ faq.atclTit }}
            </p>
            <p class="faq-list__date">
              {{ dateFormatter(faq.regDt) }}
            </p>
          </div>
        </template>
        <div>{{ faq.atclCntn }}</div>
      </el-collapse-item>
    </el-collapse>
    <Pagination
      v-model="pageData.currentPage"
      :total-count="pageData.totalCount"
    />
  </div>
</template>
