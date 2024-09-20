<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import type { TreeNode } from '~/composables/tree'
import type { IMenuDetail } from '~/types/menu'

defineProps<{
  treeData: TreeNode<IMenuDetail>
  indentLevel: number
}>()
const route = useRoute()
const router = useRouter()
const targetMenuId = ref('')

const movePage = (target: TreeNode<IMenuDetail>) => {
  console.log(target.data)
  router.push(target.data.menuUrl)
}
const hoverMenu = (target: string) => {
  targetMenuId.value = target
}
const leaveMenu = () => {
  targetMenuId.value = ''
}
</script>

<template>
  <div :style="`text-indent: ${indentLevel * 10}px;`">
    <div v-if="indentLevel === 0" style="cursor: pointer;" class="flex font__subtitle">
      <el-icon :size="20" class="mr-3">
        <Edit />
      </el-icon>
      {{ treeData.menuName }}
    </div>
    <div
      v-else link :class="`menu ${treeData.data.menuUrl === route.path ? 'menu--active' : ''}`"
      style="font-size: 0.9rem; margin-bottom: 1%;" @mouseover="hoverMenu(treeData.menuId)" @mouseleave="leaveMenu()"
      @click="movePage(treeData)"
    >
      {{ treeData.menuName }}
    </div>
    <ul class="sidebar__child">
      <li v-for="(tr, idx) in treeData.children" :key="`sidebar-main-menu-${tr.menuId}`" class="sidebar__item">
        <tree-section :tree-data="treeData.children[idx]" :indent-level="indentLevel + 1" />
      </li>
    </ul>
  </div>
</template>
