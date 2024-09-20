<script lang="ts" setup>
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type { NodeDropType } from 'element-plus/es/components/tree/src/tree.type'
import type { ICheckedList, ISearchTree, ITreeProps } from '~/types/tree'
import type { ITreeData } from '~/example/types/tree'

const props = withDefaults(defineProps<ITreeProps<ITreeData>>(), {
  treeData: () => [],
  draggable: false,
  showCheckbox: false,
  defaultExpandAll: false,
  filterNode: false,
  nodeKey: 'id',
})

const emit = defineEmits<{
  (e: 'checkedList', checkedList: string[]): void
  (e: 'update:treeData', treeData: ITreeData[]): void
  (e: 'dragEnter', dropNode: Node): void
  (e: 'dragLeave', dropNode: Node): void
  (e: 'dragOver', dropNode: Node): void
  (e: 'dragEnd', dropNode: Node, dropType: NodeDropType): void
  (e: 'clickedNode', clickedNode: string): void
  (e: 'dragStart', node: Node): void
}>()

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const checkedList = ref<string[]>([])

// 드래그 시작 시 실행
const handleDragStart = (node: Node, _ev: DragEvents) => {
  emit('dragStart', node)
}

// 드래그 된 노드가 다른 노드에 들어갈 때 실행
const handleDragEnter = (
  dropNode: Node,
) => {
  emit('dragEnter', dropNode)
}

// 드래그 된 노드가 노드를 떠날 때 실행
const handleDragLeave = (
  dropNode: Node,
) => {
  emit('dragLeave', dropNode)
}

// 노드 위로 드래그 할 때 실행 (mouseover event 와 같음)
const handleDragOver = (draggingNode: Node, dropNode: Node, _ev: DragEvents) => {
  emit('dragOver', dropNode)
}

// 드래그가 끝날 때 실행
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  _ev: DragEvents,
) => {
  emit('dragEnd', dropNode, dropType)
}

// 드래그를 놓은 후 실행
const handleDrop = () => {
  emit('update:treeData', props.treeData)
}

// 노드 클릭 시 실행
const clickNode = (clickedNode: Node, _ev: DragEvents) => {
  emit('clickedNode', clickedNode.label)
}

// 노드 체크박스 클릭 시 실행
const checkNode = (checkedNode: ICheckedList) => {
  checkedList.value = checkedNode.checkedNodes
  emit('checkedList', checkedList.value)
}

// 노드 검색
const filterNode = (value: string, data: ISearchTree) => {
  return data.label.includes(value)
}

// 내용 작성 시 즉시 검색
const searchText = () => {
  treeRef.value!.filter(filterText.value)
}

// 전체 닫기 버튼 클릭 시 실행     Todo: 하위도 닫기 기능
const collapseAll = () => {
  const treeInstance = treeRef.value
  if (treeInstance) {
    const rootNode = treeInstance.store.root
    rootNode.childNodes.forEach((node) => {
      node.collapse()
    })
  }
}

// 전체 열기 버튼 클릭 시 실행
const expandAll = () => {
  const treeInstance = treeRef.value
  if (treeInstance) {
    const rootNode = treeInstance.store.root
    rootNode.childNodes.forEach((node) => {
      node.expand()
    })
  }
}
</script>

<template>
  <div v-if="props.treeData">
    <el-input v-if="props.filterNode" v-model="filterText" class="mb-3" placeholder="Filter keyword" @keyup="searchText" />
    <div class="mb-3">
      <el-button @click="expandAll">
        전체 열기
      </el-button>
      <el-button @click="collapseAll">
        전체 닫기
      </el-button>
    </div>
    <ElTree
      ref="treeRef"
      :data="props.treeData"
      :filter-node-method="filterNode"
      :draggable="props.draggable"
      :show-checkbox="props.showCheckbox"
      :default-expand-all="props.defaultExpandAll"
      :node-key="props.nodeKey"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      @node-click="clickNode"
      @check="checkNode"
    />
  </div>
</template>
