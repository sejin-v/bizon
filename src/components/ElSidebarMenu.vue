<script lang="ts" setup>
const router = useRouter()

const isCollapse = ref(true)
const handleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const menuList = ref([
  {
    menuId: 'EXAMPLE_1',
    menuNm: '예제 리스트 1',
    menuIndex: '1',
    menuUrl: '/',
    icon: 'icon__emoji-sunglasses',
    children: [
      {
        menuId: 'DEFAULT_GRID_EXAMPLE',
        menuNm: '기본 그리드 예제',
        menuIndex: '1-1',
        menuUrl: '/example/grid-example',
      },
      {
        menuId: 'TREE_GRID_EXAMPLE',
        menuNm: '트리 그리드 예제',
        menuIndex: '1-2',
        menuUrl: '/example/tree-grid-example',
      },
      {
        menuId: 'DATEPICKER_EXAMPLE',
        menuNm: 'Datepicker 예제',
        menuIndex: '1-3',
        menuUrl: '/example/custom-datepicker',
      },
    ],
  },
  {
    menuId: 'EXAMPLE_2',
    menuNm: '예제 리스트 2',
    menuIndex: '2',
    menuUrl: '/',
    icon: 'icon__emoji-sunglasses',
    children: [
      {
        menuId: 'PAGINATION_EXAMPLE',
        menuNm: 'Pagination 예제',
        menuIndex: '2-1',
        menuUrl: '/example/pagination',
      },
      {
        menuId: 'TREE_EXAMPLE',
        menuNm: 'Tree 예제',
        menuIndex: '2-2',
        menuUrl: '/example/tree',
      },
      {
        menuId: 'MODAL_EXAMPLE',
        menuNm: 'Modal 예제',
        menuIndex: '2-3',
        menuUrl: '/example/modal',
      },
      {
        menuId: 'SELECT_BOX_EXAMPLE',
        menuNm: 'Select-Box 예제',
        menuIndex: '2-4',
        menuUrl: '/example/select-box',
      },
      {
        menuId: 'CHART_EXAMPLE',
        menuNm: 'Chart 예제',
        menuIndex: '2-5',
        menuUrl: '/example/chart',
      },
    ],
  },
  {
    menuId: 'EXAMPLE_3',
    menuNm: '예제 리스트 3',
    menuIndex: '3',
    menuUrl: '/',
    icon: 'icon__emoji-sunglasses',
    children: [
      {
        menuId: 'FILE_EXAMPLE',
        menuNm: 'Upload/Download',
        menuIndex: '3-1',
        menuUrl: '/example/file',
      },
      {
        menuId: 'CUSTOM_INPUT_EXAMPLE',
        menuNm: 'Custom-Input 예제',
        menuIndex: '3-2',
        menuUrl: '/example/custom-input',
      },
      {
        menuId: 'CONFIRM_EXAMPLE',
        menuNm: 'Confirm 예제',
        menuIndex: '3-3',
        menuUrl: '/example/confirm',
      },
      {
        menuId: 'PROGRESS_BAR_EXAMPLE',
        menuNm: 'Progress-bar 예제',
        menuIndex: '3-4',
        menuUrl: '/example/progress-bar',
      },
      {
        menuId: 'TOAST_EXAMPLE',
        menuNm: 'Toast 예제',
        menuIndex: '3-5',
        menuUrl: '/example/toast',
      },
      {
        menuId: 'Axios_EXAMPLE',
        menuNm: 'Axios 예제',
        menuIndex: '3-6',
        menuUrl: '/example/axios',
      },
    ],
  },
  {
    menuId: 'CODE_MIRROR_EXAMPLE',
    menuNm: '코드 미러 예제',
    menuIndex: '4',
    menuUrl: '/example/code-mirror-example',
    icon: 'icon__emoji-sunglasses',
  },
])

const movePage = (menuUrl: string) => {
  router.push(menuUrl)
}
</script>

<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">
            expand
        </el-radio-button>
        <el-radio-button :label="true">
            collapse
        </el-radio-button>
    </el-radio-group> -->

  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <button @click="handleSidebar">
      <Icon
        v-if="isCollapse"
        name="icon__sidebar-open"
        width="40"
        height="40"
      />
      <Icon
        v-if="!isCollapse"
        name="icon__sidebar-collapse"
        width="40"
        height="40"
      />
    </button>
    <template
      v-for="upperMenu in menuList"
      :key="`el-sidebar-menu-upper-${upperMenu.menuId}`"
    >
      <el-sub-menu v-if="upperMenu.children" :index="upperMenu.menuIndex">
        <template #title>
          <Icon :name="upperMenu.icon" width="20" height="20" />
          <span class="ml-3">{{ upperMenu.menuNm }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="lowerMenu in upperMenu.children"
            :key="`el-sidebar-menu-lower-${lowerMenu.menuId}`"
            :index="lowerMenu.menuIndex"
            @click="movePage(lowerMenu.menuUrl)"
          >
            <span>{{ lowerMenu.menuNm }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="upperMenu.menuIndex"
        @click="movePage(upperMenu.menuUrl)"
      >
        <Icon :name="upperMenu.icon" width="20" height="20" />
        <template #title>
          <span class="ml-3">{{ upperMenu.menuNm }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
