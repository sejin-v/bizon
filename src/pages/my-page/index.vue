<script setup lang="ts">
const router = useRouter()

const myPageData = [
  {
    date: '2024-05-03',
    before: {
      download: '200',
      upload: '200',
    },
    after: {
      download: '200',
      upload: '200',
    },
    status: '완료',
  },
  {
    date: '2014-05-03',
    before: {
      download: '200',
      upload: '200',
    },
    after: {
      download: '200',
      upload: '200',
    },
    status: '미완료',
  },
]

const goChangePwPage = () => {
  router.push('my-page/changePw')
}
</script>

<template>
  <div class="box--fff my-page">
    <h2 class="title">마이페이지</h2>
    <div class="title--sm">
      <span>상세정보</span>
      <span>비즈온</span>
      <span>고객번호(50000123456)</span>
    </div>

    <el-table :data="myPageData" style="width: 100%">
      <el-table-column prop="date" label="변경 요청 일자" align="center" min-width="150" />
      <el-table-column prop="before" label="변경 전&#40;다운로드 &#47; 업로드&#41;" align="center" min-width="200">
        <template #default="scope">
          <span>{{ scope.row.before.download }}</span
          >&nbsp;&#47;&nbsp;<span>{{ scope.row.before.upload }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="after" label="변경 후&#40;다운로드 &#47; 업로드&#41;" align="center" min-width="200">
        <template #default="scope">
          <span class="font-color--pink">{{ scope.row.before.download }}</span
          >&nbsp;&#47;&nbsp;<span>{{ scope.row.before.upload }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="작업 상태" align="center" min-width="150">
        <template #default="scope">
          <em :class="{ 'font-color--blue': scope.row.status === '미완료' }">{{ scope.row.status }}</em>
        </template>
      </el-table-column>
    </el-table>
    <div class="relative flex flex-wrap justify-center">
      <Pagination />
      <a href="javascript:void(0);" class="btn__line--primary-md" @click="goChangePwPage">비밀번호 변경하기</a>
    </div>
  </div>
</template>
