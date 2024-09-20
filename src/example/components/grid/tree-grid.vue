<script setup lang="ts">
import type { IColumn, IGridData } from '~/types/grid'

const props = withDefaults(defineProps<{
  parentColumns: IColumn[]
  childColumns: IColumn[]
  rows: IGridData[]
  rowIdKey: string
  modelValue?: Array<any>
  useParentCheckBox?: boolean
  useChildCheckBox?: boolean
  useParentDragColumn?: boolean
  useChildDragColumn?: boolean
  useParentDragRow?: boolean
  useChildDragRow?: boolean
  useParentColumnResizable?: boolean
  useChildColumnResizable?: boolean
  parentHeaderAlign?: string
  childHeaderAlign?: string
  parentRowAlign?: string
  childRowAlign?: string
  noDataText?: string
}>(), {
  modelValue: () => [],
  useParentCheckBox: false,
  useChildCheckBox: false,
  useParentDragColumn: false,
  useChildDragColumn: false,
  useParentDragRow: false,
  useChildDragRow: false,
  useParentColumnResizable: true,
  useChildColumnResizable: true,
  parentHeaderAlign: 'center',
  childHeaderAlign: 'center',
  parentRowAlign: 'left',
  childRowAlign: 'left',
  noDataText: '조회된 데이터가 없습니다.',
})
// const internalParentUseCheckBox = computed(() => {
//   return props.useParentCheckBox
// })
// const internalChildUseCheckBox = computed(() => {
//   return props.useChildCheckBox
// })

const internalUseParentColumnResizable = ref<boolean>(props.useParentColumnResizable)
const internalUseChildColumnResizable = ref<boolean>(props.useChildColumnResizable)

const parentTableKey = ref<number>(0)
const childTableKey = ref<number>(1)
watch(() => [props.useParentColumnResizable, props.useChildColumnResizable], ([parentNewValue, childNeValue]: boolean[]) => {
  // resizable 설정을 동적으로 바꾸려면 el-table 의 key 값을 갱신해줘야함.
  parentTableKey.value++
  childTableKey.value++

  internalUseParentColumnResizable.value = parentNewValue
  internalUseChildColumnResizable.value = childNeValue
})

// const internalParentHeaderAlign = computed(() => {
//   return props.parentHeaderAlign
// })
// const internalParentRowAlign = computed(() => {
//   return props.parentRowAlign
// })
// const internalChildHeaderAlign = computed(() => {
//   return props.childHeaderAlign
// })
// const internalChildRowAlign = computed(() => {
//   return props.childRowAlign
// })
// // 자식 데이터가 없는 경우 row 에 class 적용
// const setChildTableRowClass = ({ row, rowIndex }: IRowClassNameArgument) => {
//   if (!row.childList)
//     return 'no-expand'

//   else
//     return ''
// }
</script>

<template>
  <div>
    <el-table :data="rows" style="width: 100%" row-key="id" border
      :tree-props="{ children: 'childList', hasChildren: 'hasChildren' }">
      <el-table-column prop="datepicker" label="날짜" />
      <el-table-column prop="lastResult" label="최종 결과" />
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
