<script setup lang="ts">
const noticeList = ref([]);
const pageData = reactive({
  currentPage: 1,
  totalCount: 0,
});
// FIXME :: 모바일 해상도 대응
const breakpoints = useBreakpoints({
  mobile: 480,
});

const isMobile = breakpoints.smaller('mobile');

// 팝업
const popup: IModalPopup = reactive({
  noticeDetailPopup: {
    show: false,
  },
});
function openNoticeDetail() {
  popup.noticeDetailPopup.show = true;
}
function handleCancel() {
  popup.noticeDetailPopup.show = false;
}
onMounted(async () => {
  const result = await request.get('/mock/api/noticeList');
  console.log('>>>', result);
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
        type="index"
        label="No"
        align="center"
        width="60"
      />

      <el-table-column label="제목">
        <template #default="scope">
          <p class="font-color--dark-gray">
            {{ scope.row.title }}
          </p>
          <p v-if="isMobile">
            {{ scope.row.date }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isMobile"
        prop="date"
        label="등록일"
        align="center"
        width="130"
      />
    </el-table>
    <Pagination
      v-model="pageData.currentPage"
      :total-count="pageData.totalCount"
    />

    <!-- 공지사항 상세 팝업 -->
    <common-modal
      v-model="popup.noticeDetailPopup.show"
      title="증속서비스에 관한 규정 안내"
      desc="2024-09-09"
      :show-close="false"
    >
      <template #content>
        1. 증속서비스는 트래픽 임계치(청약속도의 80%) 초과로 인한 고객
        통지(문자/이메일) 후 5일 이내 신청가능합니다. <br />
        2. 안정적인 서비스 제공을 위해 5일 경과 후에는 증속 신청이 불가하오니
        사용을 원하는 경우 즉시 사이트를 통해 신청하시기 바랍니다. <br />
        3. 증속서비스는 최대 10일 사용가능하며, 증속에 따른 추가요금은 발생하지
        않습니다. <br />
        4. 증속서비스를 계속 사용원하실 경우 담당 영업사원을 통해 속도변경 통해
        청약접수하시기 바랍니다. <br />
        5. 증속사용기간 10일 만료 후 청약속도로 원상복귀 됩니다.
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
