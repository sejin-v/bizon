<script setup lang="ts">
import Sortable from 'sortablejs'
import type { IColumn, IDragIndexInfo, IGridData } from '~/types/grid'
import { CellTextAlignKind, DragTableTargetClassName } from '~/types/enums/grid'
import { createSortableInstance, getCommonDragOption } from '~/example/components/grid/sortable-config'

const props = withDefaults(defineProps<{
  columns: IColumn[]
  rows: IGridData[]
  rowIdKey: string
  modelValue?: Array<string> // FIXME: 프로젝트 마다 체크했을때 배열에 들어가는 값이 다를 수 있기 때문에 수정해서 사용하기
  useRowNum?: boolean
  useCheckBox?: boolean
  useDragColumn?: boolean
  useDragRow?: boolean
  useColumnResizable?: boolean
  headerAlign?: CellTextAlignKind
  noDataText?: string
  rowDragGroupName?: string
  columnDragGroupName?: string
}>(), {
  modelValue: () => [],
  useRowNum: false,
  useCheckBox: false,
  useDragColumn: false,
  useDragRow: false,
  useColumnResizable: true,
  headerAlign: CellTextAlignKind.CENTER,
  noDataText: '조회된 데이터가 없습니다.',
  rowDragGroupName: 'defaultTableDragRow',
  columnDragGroupName: 'defaultTableDragColumn',
})

const emits = defineEmits<{
  (e: 'updateTdColumnOrder', value: IDragIndexInfo): void
  (e: 'updateColumnOrder'): void
  (e: 'updateRowOrder', value: IDragIndexInfo): void
  (e: 'update:modelValue', value: string[]): void
}>()

const rowSortableInstance = ref<Sortable | null>(null)
const columnSortableInstance = ref<Sortable | null>(null)

const tableKey = ref<number>(0)

const internalUseColumnResizable = ref<boolean>(props.useColumnResizable)

const internalUseRowNum = computed(() => {
  return props.useRowNum
})
const internalUseCheckBox = computed(() => {
  return props.useCheckBox
})
const internalHeaderAlign = computed(() => {
  return props.headerAlign
})

const selectedRowList = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emits('update:modelValue', newValue)
  },
})

const onChangeRowOrder = (evt: Sortable.SortableEvent) => {
  if (evt.oldIndex !== evt.newIndex) {
    const changedOrderIndexInfo = {
      oldIndex: evt.oldIndex,
      newIndex: evt.newIndex,
    }
    emits('updateRowOrder', changedOrderIndexInfo)
  }
}

const getRowTargetAndOption = () => {
  const tbodyHtml: HTMLElement | null = document.querySelector(DragTableTargetClassName.EL_TBODY_WRAPPER)
  let tbodySortableOption = {}
  if (tbodyHtml) {
    tbodySortableOption = {
      ...getCommonDragOption(DragTableTargetClassName.ROW_DRAGGABLE, props.rowDragGroupName),
      onUpdate: onChangeRowOrder,
    }
  }

  return { tbodyHtml, tbodySortableOption }
}

const onMoveDragColumn = (evt: Sortable.MoveEvent) => {
  // 드래그 filter 걸린 컬럼에는 다른 드래그 가능한 컬럼도 드래그 안되도록 적용
  if (evt.related.classList.contains('filter-column-drag'))
    return false

  // NOTABLE: column drag 기능 동작은 확인
  const sortableUtils: any = Sortable.utils
  let newDragIndex: number = sortableUtils.index(evt.related, DragTableTargetClassName.TH_DRAGGABLE)
  let oldDragIndex: number = sortableUtils.index(evt.dragged, DragTableTargetClassName.TH_DRAGGABLE)

  if (internalUseCheckBox.value) {
    newDragIndex = newDragIndex - 1
    oldDragIndex = oldDragIndex - 1
  }
  if (internalUseRowNum.value) {
    newDragIndex = newDragIndex - 1
    oldDragIndex = oldDragIndex - 1
  }
  const draggedColumnIndexInfo = {
    oldIndex: oldDragIndex,
    newIndex: newDragIndex,
  }
  emits('updateTdColumnOrder', draggedColumnIndexInfo)
}

const onChangeColumnOrder = (evt: Sortable.SortableEvent) => {
  if (evt.oldIndex !== evt.newIndex)
    emits('updateColumnOrder')
}

const getColumnTargetAndOption = () => {
  const theadHtml: HTMLElement | null = document.querySelector(DragTableTargetClassName.EL_THEAD_WRAPPER)
  let columnSortableOption = {}
  if (theadHtml) {
    columnSortableOption = {
      ...getCommonDragOption(DragTableTargetClassName.TH_DRAGGABLE, props.columnDragGroupName),
      onMove: onMoveDragColumn,
      onUpdate: onChangeColumnOrder,
      filter: '.filter-column-drag',
    }
  }

  return { theadHtml, columnSortableOption }
}

// FIXME: 체크 한 값 들어가는 데이터 형태를 바꾸려면 이부분 수정 필요
const selectRow = (selectedList: IGridData[]) => {
  selectedRowList.value = selectedList.map(rowInfo => rowInfo[props.rowIdKey])
}

const setInitSortable = (appliedTargetHtml: HTMLElement | null, sortableOption: Sortable.Options, savedInstanceTemplate: Ref<null | Sortable>, useDrag: boolean) => {
  if (appliedTargetHtml) {
    savedInstanceTemplate.value = createSortableInstance(appliedTargetHtml, sortableOption)
    savedInstanceTemplate.value.option('disabled', !useDrag)
  }
}

watch(() => props.useColumnResizable, (newValue: boolean) => {
  // resizable 설정을 동적으로 바꾸려면 el-table 의 key 값을 갱신해줘야함.
  tableKey.value++
  internalUseColumnResizable.value = newValue
})

watch(() => props.useDragColumn, (newValue: boolean) => {
  columnSortableInstance.value?.option('disabled', !newValue)
})
watch(() => props.useDragRow, (newValue: boolean) => {
  rowSortableInstance.value?.option('disabled', !newValue)
})

onMounted(() => {
  const { tbodyHtml, tbodySortableOption } = getRowTargetAndOption()
  setInitSortable(tbodyHtml, tbodySortableOption, rowSortableInstance, props.useDragRow)

  const { theadHtml, columnSortableOption } = getColumnTargetAndOption()
  setInitSortable(theadHtml, columnSortableOption, columnSortableInstance, props.useDragColumn)
})

onUnmounted(() => {
  rowSortableInstance.value?.destroy()
  columnSortableInstance.value?.destroy()
})
</script>

<template>
  <div>
    <el-table :key="tableKey" :data="rows" row-key="id" border style="width: 100%" :empty-text="noDataText"
      @selection-change="selectRow">
      <el-table-column v-if="internalUseCheckBox" type="selection" class-name="filter-column-drag" />
      <el-table-column v-if="internalUseRowNum" type="index" class-name="filter-column-drag" />
      <el-table-column v-for="(column) of columns" :key="`common-grid-column-${column.property}`" :label="column.label"
        :prop="column.type ? '' : column.property" :min-width="column.minWidth" :resizable="internalUseColumnResizable"
        :sortable="column.sortable" :header-align="internalHeaderAlign"
        :align="column.rowAlign ? column.rowAlign : CellTextAlignKind.CENTER"
        :class-name="!column.draggable ? 'filter-column-drag' : ''">
        <template v-if="column.type" #default="scope">
          <slot :name="column.property" :scope="scope" :column="column" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
