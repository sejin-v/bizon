<script setup lang="ts">
import type { IGridOption, ITreeGridRowInfo } from '~/example/types/grid';
import type { IColumn, IGridData } from '~/types/grid';

const treeGridData = ref<ITreeGridRowInfo[]>([
  {
    id: '1',
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
    childList: [
      {
        id: '1-1',
        parentId: '1',
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
        id: '1-2',
        parentId: '1',
        manager: {
          userId: 'test',
          userName: '테스트',
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
        datepicker: '2023-09-19',
        lastResult: '등록 완료',
      },
    ],
  },
  {
    id: '2',
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
    childList: [
      {
        id: '2-1',
        parentId: '2',
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
    ],
  },
  {
    id: '3',
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
    datepicker: '2023-09-20',
    lastResult: '',
  },
]);

const parentColumns = ref<IColumn[]>([
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
    draggable: true,
  },
  {
    property: 'lastResult',
    label: '최종 결과',
    minWidth: 10,
    draggable: true,
  },
]);
const childColumns = ref<IColumn[]>([
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
    draggable: true,
  },
  {
    property: 'lastResult',
    label: '최종 결과',
    minWidth: 10,
    draggable: true,
  },
]);

// const selectedRowList = ref<IGridRowInfo[]>([])

const updateColumnOrder = (
  changedOrderColumns: IColumn[],
  isUpperTable: boolean
) => {
  // 컬럼 순서 변경하는 API 호출(columns.value 값을 백엔드로 보내주고, 순서 변경하도록 적용 필요)
  if (isUpperTable) {
    // 부모 컬럼 드래그 이동
  } else {
    // 자식 컬럼 드래그 이동
  }
};

const updateRowOrder = (rowList: IGridData[]) => {
  console.info('rowList', rowList);
  // row 순서 변경하는 API 호출(treeGridData.value 값을 백엔드로 보내주면됨.)
};

// const managerButtonRef = ref<Record<number, HTMLButtonElement>>({})
// const progressStatusButtonRef = ref<Record<number, HTMLButtonElement>>({})
// const issueAndRiskButtonRef = ref<Record<number, HTMLButtonElement>>({})

// const openYnOptions = [
//   {
//     value: 'Y',
//     label: '전체공개',
//   },
//   {
//     value: 'N',
//     label: '제한공개',
//   },
// ]

const alignOptions = [
  {
    value: 'left',
    label: '왼쪽 정렬',
  },
  {
    value: 'center',
    label: '가운데 정렬',
  },
  {
    value: 'right',
    label: '오른쪽 정렬',
  },
];

const parentTableOption: IGridOption = reactive({
  useCheckBox: false,
  useDragColumn: false,
  useDragRow: false,
  useColumnResizable: true,
  headerAlign: 'left',
  rowAlign: 'left',
});

const childTableOption: IGridOption = reactive({
  useCheckBox: false,
  useDragColumn: false,
  useDragRow: true,
  useColumnResizable: true,
  headerAlign: 'left',
  rowAlign: 'left',
});
</script>

<template>
  <div>
    <h2 class="pb-2">트리 그리드 예제</h2>
    <div class="border-dotted border-2 p-2 mb-2 rounded-md border-lime-600">
      <h3>부모 테이블 설정</h3>
      <div class="flex pb-2">
        <div class="w-1/2">
          <span class="pr-2">체크박스 사용여부</span>
          <span
            ><el-switch v-model="parentTableOption.useCheckBox" />{{
              parentTableOption.useCheckBox
            }}</span
          >
        </div>
        <div class="w-1/2">
          <span class="pr-2">컬럼 넓이 조정 사용여부</span>
          <span
            ><el-switch v-model="parentTableOption.useColumnResizable" />{{
              parentTableOption.useColumnResizable
            }}</span
          >
        </div>
      </div>
      <div class="flex pb-2">
        <div class="w-1/2">
          <span class="pr-2">컬럼 드래그</span>
          <span
            ><el-switch v-model="parentTableOption.useDragColumn" />{{
              parentTableOption.useDragColumn
            }}</span
          >
        </div>
        <div class="w-1/2">
          <span class="pr-2">row 드래그</span>
          <span
            ><el-switch v-model="parentTableOption.useDragRow" />{{
              parentTableOption.useDragRow
            }}</span
          >
        </div>
      </div>
      <div class="flex pb-2">
        <div class="w-1/2 align-middle">
          <span class="pr-2">header 텍스트 정렬</span>
          <span
            ><el-radio-group
              v-model="parentTableOption.headerAlign"
              class="ml-4"
            >
              <el-radio
                v-for="align of alignOptions"
                :key="align.value"
                :label="align.value"
                size="large"
                >{{ align.label }}</el-radio
              >
            </el-radio-group></span
          >
        </div>
        <div class="w-1/2">
          <span class="pr-2">cell 텍스트 정렬</span>
          <span
            ><el-radio-group v-model="parentTableOption.rowAlign" class="ml-4">
              <el-radio
                v-for="align of alignOptions"
                :key="align.value"
                :label="align.value"
                size="large"
                >{{ align.label }}</el-radio
              >
            </el-radio-group></span
          >
        </div>
      </div>
    </div>
    <div class="border-dotted border-2 p-2 mb-2 rounded-md border-lime-600">
      <h3>자식 테이블 설정</h3>
      <div class="flex pb-2">
        <div class="w-1/2">
          <span class="pr-2">체크박스 사용여부</span>
          <span
            ><el-switch v-model="childTableOption.useCheckBox" />{{
              childTableOption.useCheckBox
            }}</span
          >
        </div>
        <div class="w-1/2">
          <span class="pr-2">컬럼 넓이 조정 사용여부</span>
          <span
            ><el-switch v-model="childTableOption.useColumnResizable" />{{
              childTableOption.useColumnResizable
            }}</span
          >
        </div>
      </div>
      <div class="flex pb-2">
        <div class="w-1/2">
          <span class="pr-2">컬럼 드래그</span>
          <span
            ><el-switch v-model="childTableOption.useDragColumn" />{{
              childTableOption.useDragColumn
            }}</span
          >
        </div>
        <div class="w-1/2">
          <span class="pr-2">row 드래그</span>
          <span
            ><el-switch v-model="childTableOption.useDragRow" />{{
              childTableOption.useDragRow
            }}</span
          >
        </div>
      </div>
      <div class="flex pb-2">
        <div class="w-1/2 align-middle">
          <span class="pr-2">header 텍스트 정렬</span>
          <span
            ><el-radio-group
              v-model="childTableOption.headerAlign"
              class="ml-4"
            >
              <el-radio
                v-for="align of alignOptions"
                :key="align.value"
                :label="align.value"
                size="large"
                >{{ align.label }}</el-radio
              >
            </el-radio-group></span
          >
        </div>
        <div class="w-1/2">
          <span class="pr-2">cell 텍스트 정렬</span>
          <span
            ><el-radio-group v-model="childTableOption.rowAlign" class="ml-4">
              <el-radio
                v-for="align of alignOptions"
                :key="align.value"
                :label="align.value"
                size="large"
                >{{ align.label }}</el-radio
              >
            </el-radio-group></span
          >
        </div>
      </div>
    </div>
    <TreeTableGrid
      v-model:rows="treeGridData"
      v-model:parent-columns="parentColumns"
      v-model:child-columns="childColumns"
      row-id-key="id"
      :use-parent-check-box="parentTableOption.useCheckBox"
      :use-child-check-box="childTableOption.useCheckBox"
      :use-parent-drag-column="parentTableOption.useDragColumn"
      :use-child-drag-column="childTableOption.useDragColumn"
      :use-parent-drag-row="parentTableOption.useDragRow"
      :use-child-drag-row="childTableOption.useDragRow"
      :use-parent-column-resizable="parentTableOption.useColumnResizable"
      :use-child-column-resizable="childTableOption.useColumnResizable"
      :parent-header-align="parentTableOption.headerAlign"
      :child-header-align="childTableOption.headerAlign"
      :parent-row-align="parentTableOption.rowAlign"
      :child-row-align="childTableOption.rowAlign"
      @change-row-order="updateRowOrder"
      @change-column-order="updateColumnOrder"
    />
  </div>
</template>

<style scoped></style>
