<script lang="ts" setup>
// FIXME: 임시 타입 지정

const router = useRouter();

const uiComponentData = reactive<any[]>([
  {
    name: 'axios',
    desc: ' API Request',
  },
  {
    name: 'button',
    desc: 'button',
  },
  {
    name: 'chart',
    desc: ' line  / bar  / pie  / tree',
  },
  // {
  //   name: 'datepicker',
  //   desc: 'Datepicker',
  // },
  {
    name: 'vue-date-picker',
    desc: 'vue-date-picker example',
  },

  {
    name: 'form',
    desc: 'input / chat-input / textarea / select / checkbox / radio',
  },
  {
    name: 'grid',
    desc: 'Grid / Pagination',
  },
  {
    name: 'icon-example',
    desc: 'Icon Image Example',
  },
  {
    name: 'popup',
    desc: 'Popup',
  },
  {
    name: 'radial-progress',
    desc: 'radial progress',
  },
  {
    name: 'progress-bar',
    desc: 'Progress Bar',
  },
  {
    name: 'progress-circular',
    desc: 'Progress Circular',
  },
  // {
  //   name: 'select-box',
  //   desc: 'Select Box',
  // },
  // {
  //   name: 'tree-grid-example',
  //   desc: 'Tree Grid Example',
  // },
  {
    name: 'tree',
    desc: 'Tree',
  },
  {
    name: 'card',
    desc: 'card',
  },

  {
    name: 'chart-js',
    desc: 'chartjs example',
  },

  {
    name: 'openapi-ts',
    desc: 'openapi-ts example',
  },
  {
    name: 'highlightText',
    desc: 'highlightText example',
  },
]);

const movePage = (target: any) => {
  router.push(`/example/${target.name}`);
};
</script>

<template>
  <div class="p-20 examples">
    <h1 class="mb-10 text-3xl font-semibold">UI Examples</h1>

    <el-table
      :data="uiComponentData"
      row-class-name="cursor-pointer"
      @row-click="movePage"
    >
      <el-table-column type="index" width="'5%'" />
      <el-table-column property="name" label="Name" width="'20%'" />
      <el-table-column property="desc" label="Description" width="'75%'" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: ui-examples
meta:
  isPublicPath: true
</route>
