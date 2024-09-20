<!-- <script setup lang="ts">
import type { IGridRowInfo } from '~/example/types/grid'
import type { IColumn, IDragIndexInfo } from '~/types/grid'
import { CellTextAlignKind } from '~/types/enums/grid'
import Grid from '~/example/components/grid/default-grid.vue'

const defaultGridData = ref<IGridRowInfo[]>([
  {
    id: 0,
    manager: {
      userId: 'zlxl0519',
      userName: '정승희',
      organizationCode: '0001',
      organizationName: '지능플랫폼사업팀',
    },
    progressStatus: {
      statusSno: 1,
      statusName: '진행중',
      statusCode: '1',
    },
    issueAndRisk: {
      labelName: '지연',
      labelContents: '지연되었습니다.',
      colorCode: '#0000FF',
      colorName: 'blue',
    },
    openYn: 'Y',
    datepicker: '2023-09-07',
    lastResult: '등록 완료',
  },
  {
    id: 1,
    manager: {
      userId: 'hskeko',
      userName: '고현석',
      organizationCode: '0001',
      organizationName: '지능플랫폼사업팀',
    },
    progressStatus: {
      statusSno: 2,
      statusName: '진행중',
      statusCode: '1',
    },
    issueAndRisk: {
      labelName: '지연',
      labelContents: '지연되었습니다.',
      colorCode: '#0000FF',
      colorName: 'blue',
    },
    openYn: 'N',
    datepicker: '2023-09-08',
    lastResult: '',
  },
])

const columns = ref<IColumn[]>([
  {
    property: 'manager',
    label: '담당자',
    minWidth: 25,
    type: 'popover',
    draggable: true,
  },
  {
    property: 'progressStatus',
    label: '진행단계',
    minWidth: 20,
    type: 'popover',
    draggable: true,
    rowAlign: CellTextAlignKind.LEFT,
  },
  {
    property: 'issueAndRisk',
    label: '이슈/리스크',
    minWidth: 17,
    type: 'popover',
    draggable: true,
  },
  {
    property: 'datepicker',
    label: '날짜',
    minWidth: 13,
    sortable: true,
    draggable: true,
  },
  {
    property: 'openYn',
    label: '공개 여부',
    minWidth: 15,
    type: 'selectBox',
    draggable: false,
  },
  {
    property: 'lastResult',
    label: '최종 결과',
    minWidth: 10,
    draggable: true,
  },
])

const selectedRowList = ref<string[]>([])

const changeListItemOrder = (list: (IColumn | IGridRowInfo)[], fromIndex: number | undefined, toIndex: number | undefined) => {
  if (fromIndex !== undefined && toIndex !== undefined) {
    const [item] = list.splice(fromIndex, 1)
    list.splice(toIndex, 0, item)
  }
}

// 컬럼 TH 영역의 순서가 변경 될때 TD 영역의 순서 변경(화면에 보이는 순서도 이동하기 위해 필요)
const updateTdColumnOrder = ({ oldIndex, newIndex }: IDragIndexInfo) => {
  changeListItemOrder(columns.value, oldIndex, newIndex)
}

const updateColumnOrder = () => {
  // 컬럼 순서 변경하는 API 호출(columns.value 값을 백엔드로 보내주고, 순서 변경하도록 적용 필요)

}

const updateRowOrder = ({ oldIndex, newIndex }: IDragIndexInfo) => {
  changeListItemOrder(defaultGridData.value, oldIndex, newIndex)
  // row 순서 변경하는 API 호출(defaultGridData.value 값을 백엔드로 보내주고, 순서 변경하도록 적용 필요)
}

const managerButtonRef = ref<Record<number, HTMLButtonElement>>({})
const progressStatusButtonRef = ref<Record<number, HTMLButtonElement>>({})
const issueAndRiskButtonRef = ref<Record<number, HTMLButtonElement>>({})

const openYnOptions = [
  {
    value: 'Y',
    label: '전체공개',
  },
  {
    value: 'N',
    label: '제한공개',
  },
]

const useCheckBox = ref<boolean>(false)
const useRowNum = ref<boolean>(false)
const useColumnResizable = ref<boolean>(false)
const useDragColumn = ref<boolean>(false)
const useDragRow = ref<boolean>(false)
const headerAlign = ref<CellTextAlignKind>(CellTextAlignKind.CENTER)

const alignOptions = [
  {
    value: CellTextAlignKind.LEFT,
    label: '왼쪽 정렬',
  },
  {
    value: CellTextAlignKind.CENTER,
    label: '가운데 정렬',
  },
  {
    value: CellTextAlignKind.RIGHT,
    label: '오른쪽 정렬',
  },
]
</script>

<template>
  <div>
    <div class="mb-4">
      <h2 class="pb-2">
        기본 그리드 예제
      </h2>
      <div class="border-dotted border-2 p-2 mb-2 rounded-md border-lime-600">
        <div class="flex pb-2">
          <div class="w-1/3">
            <span class="pr-2">체크박스 사용여부</span>
            <span><el-switch v-model="useCheckBox" />{{ useCheckBox }}</span>
          </div>
          <div class="w-1/3">
            <span class="pr-2">데이터 순번 사용여부</span>
            <span><el-switch v-model="useRowNum" />{{ useRowNum }}</span>
          </div>
          <div class="w-1/3">
            <span class="pr-2">컬럼 넓이 조정 사용여부</span>
            <span><el-switch v-model="useColumnResizable" />{{ useColumnResizable }}</span>
          </div>
        </div>
        <div class="flex pb-2">
          <div class="w-1/3">
            <span class="pr-2">컬럼 드래그</span>
            <span><el-switch v-model="useDragColumn" />{{ useDragColumn }}</span>
          </div>
          <div class="w-1/3">
            <span class="pr-2">row 드래그</span>
            <span><el-switch v-model="useDragRow" />{{ useDragRow }}</span>
          </div>
        </div>
        <div class="flex pb-2">
          <div class="w-1/2 align-middle">
            <span class="pr-2">header 텍스트 정렬</span>
            <span><el-radio-group v-model="headerAlign" class="ml-4">
                <el-radio v-for="align of alignOptions" :key="align.value" :label="align.value" size="large">{{
              align.label }}</el-radio>
              </el-radio-group></span>
          </div>
        </div>
      </div>
      <Grid v-model="selectedRowList" :rows="defaultGridData" :columns="columns" row-id-key="id"
        :use-row-num="useRowNum" :use-check-box="useCheckBox" :use-drag-column="useDragColumn"
        :use-drag-row="useDragRow" :use-column-resizable="useColumnResizable" :header-align="headerAlign"
        @update-td-column-order="updateTdColumnOrder" @update-column-order="updateColumnOrder"
        @update-row-order="updateRowOrder">
        <template #manager="{ scope }">
          <button :ref="el => (managerButtonRef[scope.$index] = el as HTMLButtonElement)">
            +
          </button>
          <el-popover v-if="!isEmpty(scope.row.manager)" :virtual-ref="managerButtonRef[scope.$index]" trigger="click"
            virtual-triggering>
            <div>
              <span>{{ scope.row.manager.userName }}</span>
            </div>
          </el-popover>
        </template>
        <template #progressStatus="{ scope }">
          <button :ref="el => (progressStatusButtonRef[scope.$index] = el as HTMLButtonElement)">
            {{ scope.row.progressStatus.statusName }}
          </button>
          <el-popover :virtual-ref="progressStatusButtonRef[scope.$index]" trigger="click" virtual-triggering>
            <div>
              <span>{{ scope.row.progressStatus.statusName }}</span>
            </div>
          </el-popover>
        </template>
        <template #issueAndRisk="{ scope }">
          <button :ref="el => (issueAndRiskButtonRef[scope.$index] = el as HTMLButtonElement)">
            {{ scope.row.issueAndRisk.labelName }}
          </button>
          <el-popover :virtual-ref="issueAndRiskButtonRef[scope.$index]" trigger="click" virtual-triggering>
            <div>
              <span>{{ scope.row.issueAndRisk.labelContents }}</span>
            </div>
          </el-popover>
        </template>
        <template #openYn="{ scope }">
          <el-select v-model="scope.row.openYn" class="m-2" placeholder="Select" size="small">
            <el-option v-for="item in openYnOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </Grid>
    </div>
  </div>
</template>

<style scoped></style> -->
<script setup lang="ts">
import type { IPaginationOptions } from '~/types/pagination'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const paginationOptions: IPaginationOptions = reactive({
  currentPage: 1,
  totalCount: 1000,
  limit: 20,
  limitOptions: [50, 100, 150, 200],
  maxPagesShown: 10,
})

function changeLimit(newLimit: number) {
  paginationOptions.limit = newLimit
}
</script>

<template>
  <div class="p-20">
    <h2 class="mb-10 text-3xl font-semibold">
      grid
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Basic
      </mark>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" align="center" />
        <el-table-column prop="name" label="Name" width="180" align="center" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      <Pagination v-model="paginationOptions.currentPage" :total-count="paginationOptions.totalCount"
        :limit="paginationOptions.limit" :limit-options="paginationOptions.limitOptions"
        :max-pages-shown="paginationOptions.maxPagesShown" below-limit-shown limit-options-shown
        @change-limit="changeLimit" />
    </div>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Size = "small"
      </mark>
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column type="index" label="No" width="60" align="center" />
        <el-table-column prop="name" label="Name" width="180" align="center" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>
