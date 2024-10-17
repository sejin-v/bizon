<script setup lang="ts">
import { IMyPageData } from '~/types';

const router = useRouter();
const serviceData = reactive({
  svcNm: '',
  entrNo: '',
});
const myPageData = ref<IMyPageData[]>([]);

const pageData = reactive({
  currentPage: 1,
  totalCount: 0,
});

const getMyPageData = async () => {
  const result = await request.get('/bizon/api/mypage/speed-increase-history', {
    params: {
      perPageNum: 10,
      page: pageData.currentPage,
    },
  });
  return result.data.data;
};

const goChangePwPage = () => {
  router.push('my-page/changePw');
};

onMounted(async () => {
  const result = await getMyPageData();
  serviceData.entrNo = result.entrNo;
  serviceData.svcNm = result.svcNm;
  pageData.totalCount = result.totalCount;
  myPageData.value = result.myPageSpeedIncreaseHistoryDTOList;
});
</script>

<template>
  <div class="box--fff my-page">
    <h2 class="title">마이페이지</h2>
    <div class="title--sm">
      <span>상세정보</span>
      <span>{{ serviceData.svcNm }}</span>
      <span>고객번호({{ serviceData.entrNo }})</span>
    </div>
    <el-table :data="myPageData" style="width: 100%">
      <el-table-column
        prop="regDttm"
        label="변경 요청 일자"
        align="center"
        min-width="150"
      />
      <el-table-column
        prop="before"
        label="변경 전&#40;다운로드 &#47; 업로드&#41;"
        align="center"
        min-width="200"
      >
        <template #default="scope">
          <span>
            {{ scope.row.sbscDownSpedVlue ? scope.row.sbscDownSpedVlue : 0 }}M
          </span>
          &nbsp;&#47;&nbsp;
          <span>
            {{ scope.row.sbscUpldSpedVlue ? scope.row.sbscUpldSpedVlue : 0 }}M
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="after"
        label="변경 후&#40;다운로드 &#47; 업로드&#41;"
        align="center"
        min-width="200"
      >
        <template #default="scope">
          <span
            :class="{
              'font-color--pink':
                scope.row.icspRqstDownSped !== scope.row.sbscDownSpedVlue,
            }"
          >
            {{ scope.row.icspRqstDownSped }}M
          </span>
          &nbsp;&#47;&nbsp;
          <span
            :class="{
              'font-color--pink':
                scope.row.icspRqstUpldSped !== scope.row.sbscUpldSpedVlue,
            }"
          >
            {{ scope.row.icspRqstUpldSped }}M
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskStatus"
        label="작업 상태"
        align="center"
        min-width="150"
      >
        <template #default="scope">
          <em
            :class="{ 'font-color--blue': scope.row.taskStatus === '미완료' }"
            >{{ scope.row.taskStatus }}</em
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="relative flex flex-wrap justify-center">
      <Pagination
        v-model="pageData.currentPage"
        :total-count="pageData.totalCount"
      />
      <a
        href="javascript:void(0);"
        class="btn__line--primary-md"
        @click="goChangePwPage"
        >비밀번호 변경하기</a
      >
    </div>
  </div>
</template>
