<script setup lang="ts">
const faqList = ref();
const faqData = ref();

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

const popup = reactive({
  faqDetailPopup: {
    show: false,
  },
});

const getParams = () => {
  return {
    atclKdCd: 'FAQ',
    page: pageData.currentPage,
    perPageNum: 10,
  };
};

const getFaqList = async (params: any) => {
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
  const params = {
    atclKdCd: target.atclKdCd,
    atclSno: target.atclSno,
  };
  try {
    const result = await request.get('/bizon/api/board/detail', {
      params,
      headers: {
        'X-COMMAND': 'P07009',
      },
    });
    faqData.value = result.data.data;
    popup.faqDetailPopup.show = true;
  } catch (error: any) {
    if (error.code === '40423001') {
      confirmOption.content = '게시글이 존재하지 않습니다.';
      await openConfirm(confirmOption);
    }
  }
};

function handleCancel() {
  popup.faqDetailPopup.show = false;
}
onMounted(async () => {
  handleSearch();
});
</script>

<template>
  <div class="faq-list">
    <!-- <div class="faq-list__header">
      <p>No</p>
      <p>제목</p>
      <p v-if="!isMobile">등록일</p>
    </div> -->
    <el-table
      :data="faqList"
      style="width: 100%"
      class="notice__list"
      @row-click="handleClickFaq"
    >
      <el-table-column prop="rowNum" label="No" align="center" width="60" />

      <el-table-column label="제목">
        <template #default="scope">
          <p class="font-color--dark-gray">
            {{ scope.row.atclTit }}
          </p>
          <p v-if="isMobile">
            {{ dateFormatter(scope.row.regDt) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isMobile"
        prop="regDt"
        label="등록일"
        align="center"
        width="130"
      >
        <template #default="scope">
          <p>
            {{ dateFormatter(scope.row.regDt) }}
          </p>
        </template></el-table-column
      >
    </el-table>
    <Pagination
      v-model="pageData.currentPage"
      :total-count="pageData.totalCount"
    />
    <common-modal
      v-model="popup.faqDetailPopup.show"
      :title="faqData?.atclTit"
      :desc="dateFormatter(faqData?.regDt)"
      :show-close="false"
    >
      <template #content>
        {{ faqData?.atclCntn }}
      </template>
      <template #footer>
        <button
          type="button"
          class="btn__full--primary-md"
          @click="handleCancel"
        >
          목록보기
        </button>
      </template>
    </common-modal>
  </div>
</template>
