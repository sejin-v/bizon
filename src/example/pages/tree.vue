<script setup lang="ts">
import mockTreeData from '~/example/mock/treeData.js'
import Tree from '~/example/components/tree/Tree.vue'
import type { ITreeData } from '~/example/types/tree'

const treeData = ref<ITreeData[]>(mockTreeData)
const checkList = ref<string[]>([])
function setCheckList(checkedList: string[]) {
  checkList.value = checkedList
}
</script>

<template>
  <div class="p-20">
    <h2 class="mb-10 text-3xl font-semibold">
      tree
    </h2>
    <Tree v-model:tree-data="treeData" draggable show-checkbox default-expand-all filter-node node-key="id"
      @checked-list="setCheckList" />
  </div>
</template>

<style scoped></style>
