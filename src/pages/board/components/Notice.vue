<script setup lang="ts">
interface INoticeParameter {
  atclKdCd: string;
  page: number;
  perPageNum: number;
}

interface INoticeData {
  rowNum: number;
  atclKdCd: string;
  atclSno: number;
  atclTit: string;
  atclCntn: string;
  regDt: string;
}
const noticeList = ref<INoticeData[]>([]);
const noticeData = ref<INoticeData>();
const pageData = reactive({
  currentPage: 1,
  totalCount: 0,
});

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

// 팝업
const popup = reactive({
  noticeDetailPopup: {
    show: false,
  },
});

const getParams = () => {
  return {
    atclKdCd: 'ANNC',
    page: pageData.currentPage,
    perPageNum: 10,
  };
};
const getNoticeList = async (params: INoticeParameter) => {
  const result = await request.get('/bizon/api/board/list', {
    params,
    headers: {
      'X-COMMAND': 'P07008',
    },
  });
  return result.data.data;
};

const handleSearch = async () => {
  const params = getParams();
  const result = await getNoticeList(params);
  noticeList.value = result.articleList;
  pageData.totalCount = result.totalCount;
};

const openNoticeDetail = async (target: INoticeData) => {
  const params = {
    atclKdCd: target.atclKdCd,
    atclSno: target.atclSno,
  };
  try {
    const result = await request.get('/bizon/api/board/detail', {
      params,
      headers: {
        'X-COMMAND': 'P07103',
      },
    });
    noticeData.value = result.data.data;
    popup.noticeDetailPopup.show = true;
  } catch (error: any) {
    if (error.code === '40423001') {
      confirmOption.content = '게시글이 존재하지 않습니다.';
      await openConfirm(confirmOption);
    }
  }
};

function handleCancel() {
  popup.noticeDetailPopup.show = false;
}
onMounted(async () => {
  handleSearch();
});
</script>

<template>
  <div class="notice">
    <el-table
      :data="noticeList"
      style="width: 100%"
      class="notice__list"
      @row-click="openNoticeDetail"
    >
      <el-table-column
        v-if="!isMobile"
        prop="rowNum"
        label="No"
        align="center"
        width="60"
      />

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
      @click="handleSearch"
    />

    <!-- 공지사항 상세 팝업 -->
    <common-modal
      v-model="popup.noticeDetailPopup.show"
      :title="noticeData?.atclTit"
      :desc="dateFormatter(noticeData?.regDt)"
      :show-close="false"
    >
      <template #content>
        {{ noticeData?.atclTit }}
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
