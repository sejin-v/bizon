import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IGridData } from '~/types/grid'

export const useGridStore = defineStore('gridStore', () => {
  const treeParentCheckedList = ref<IGridData[]>([])

  // 자식 테이블은 여러개이기 때문에 아래와 같은 형태로 데이터가 만들어짐.
  /*
 *
 * {
 *    parentId: []
 * }
 */
  const treeChildrenCheckedList = ref<Record<string, IGridData[]>>({})

  const setTreeParentCheckedList = (checkedList: IGridData[]) => {
    treeParentCheckedList.value = checkedList
  }
  const setTreeChildrenCheckedList = (checkedList: IGridData[], parentRowId: string) => {
    treeChildrenCheckedList.value[parentRowId] = checkedList
  }

  return {
    treeParentCheckedList,
    treeChildrenCheckedList,
    setTreeParentCheckedList,
    setTreeChildrenCheckedList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGridStore, import.meta.hot))
