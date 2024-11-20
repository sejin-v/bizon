<script setup lang="ts">
const faqList = ref();
const faqIdList = ref<string[]>([]);
const pageData = reactive({
  currentPage: 1,
  totalCount: 0,
});
// FIXME :: 모바일 해상도 대응
const breakpoints = useBreakpoints({
  mobile: 480,
});
const isMobile = breakpoints.smaller('mobile');
const confirmOption = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: true,
});
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
    headers: {
      'X-COMMAND': 'P07009',
    },
  });
  return result.data.data;
};

const handleSearch = async () => {
  const params = getParams();
  const result = await getFaqList(params);
  faqList.value = result.articleList;
  pageData.totalCount = result.totalCount;
};
const handleClickFaq = async (target: any) => {
  if (!target.length || faqList.value[target[target.length - 1]].atclCntn)
    return;
  faqIdList.value.push(target[target.length - 1]);
  const params = {
    atclKdCd: faqList.value[target[target.length - 1]].atclKdCd,
    atclSno: faqList.value[target[target.length - 1]].atclSno,
  };
  try {
    const result = await request.get('/bizon/api/board/detail', {
      params,
      headers: {
        'X-COMMAND': 'P07009',
      },
    });

    faqList.value[target[target.length - 1]].atclCntn =
      result.data.data.atclCntn;
  } catch (error: any) {
    if (error.code === '40423001') {
      confirmOption.content = '게시글이 존재하지 않습니다.';
      await openConfirm(confirmOption);
    }
  }
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
    <el-collapse @change="handleClickFaq">
      <el-collapse-item
        v-for="(faq, i) in faqList"
        :key="`faq-list-${faq.atclSno}`"
        :name="i"
      >
        <template #title>
          <p class="faq-list__num">
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
