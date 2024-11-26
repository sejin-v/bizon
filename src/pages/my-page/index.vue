<script setup lang="ts">
import dayjs from 'dayjs';
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
    headers: {
      'X-COMMAND': 'P07006',
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
    <div class="title--sm flex">
      <span>상세정보</span>
      <span>상품명&#58; {{ serviceData.svcNm }}</span>
      <span>고객번호(가입번호)&#58; {{ serviceData.entrNo }}</span>
    </div>
    <el-table :data="myPageData" style="width: 100%">
      <el-table-column
        prop="trfEvetOccrBaseDttm"
        label="트래픽 초과 기준일자"
        align="center"
        min-width="150"
      >
        <template #default="scope">
          <p class="!whitespace-normal">
            {{
              scope.row.trfEvetOccrBaseDttm
                ? dayjs(scope.row.trfEvetOccrBaseDttm).format(
                    'YYYY-MM-DD HH시 mm분'
                  )
                : ''
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="사용 속도"
        label="사용 속도"
        align="center"
        min-width="150"
      >
        <template #default="scope">
          <div class="flex flex-col items-center">
            <p class="flex items-center">
              {{
                scope.row.occrTrfUpldSpedVlue
                  ? `업로드 ${scope.row.occrTrfUpldSpedVlue}`
                  : 0
              }}
              <icon
                name="triangle__full--525"
                width="11"
                height="9"
                alt=""
                class="ml-2.5"
              />
            </p>
            <p class="flex items-center">
              {{
                scope.row.occrTrfDownSpedVlue
                  ? `다운로드 ${scope.row.occrTrfDownSpedVlue}`
                  : 0
              }}
              <icon
                name="triangle__full--525"
                width="11"
                height="9"
                alt=""
                class="ml-2.5 rotate-180"
              />
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="regDttm"
        label="증속 신청일자"
        align="center"
        min-width="150"
      />

      <el-table-column
        prop="before"
        label="증속 전&#40;다운로드 &#47; 업로드&#41;"
        align="center"
        min-width="200"
      >
        <template #default="scope">
          <span>
            {{ scope.row.sbscDownSpedVlue ? scope.row.sbscDownSpedVlue : 0 }}
          </span>
          &nbsp;&#47;&nbsp;
          <span>
            {{ scope.row.sbscUpldSpedVlue ? scope.row.sbscUpldSpedVlue : 0 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="after"
        label="증속 후&#40;다운로드 &#47; 업로드&#41;"
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
            {{ scope.row.icspRqstDownSped }}
          </span>
          &nbsp;&#47;&nbsp;
          <span
            :class="{
              'font-color--pink':
                scope.row.icspRqstUpldSped !== scope.row.sbscUpldSpedVlue,
            }"
          >
            {{ scope.row.icspRqstUpldSped }}
          </span>
          <!-- <div class="flex flex-col items-center">
            <p class="flex items-center">
              {{ scope.row.sbscDownSpedVlue ? scope.row.sbscDownSpedVlue : 0 }}
              <icon
                name="triangle__full--525"
                width="11"
                height="9"
                alt=""
                class="ml-2.5"
              />
            </p>
            <p class="flex items-center">
              {{ scope.row.sbscUpldSpedVlue ? scope.row.sbscUpldSpedVlue : 0 }}
              <icon
                name="triangle__full--525"
                width="11"
                height="9"
                alt=""
                class="ml-2.5 rotate-180"
              />
            </p>
          </div> -->
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
            :class="{
              'font-color--blue': scope.row.taskStatus === '증속 실패',
            }"
            >{{ scope.row.taskStatus }}</em
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="relative flex flex-wrap justify-end mt-10">
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
