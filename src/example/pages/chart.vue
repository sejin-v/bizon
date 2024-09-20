<script setup lang="ts">
import LineChart from '~/example/components/line-chart/LineChartComponent.vue'
import BarChart from '~/example/components/bar-chart/BarChartComponent.vue'

// import PieChart from '~/example/components/pie-chart/PieChartComponent.vue'
// import TreemapChart from '~/example/components/treemap-chart/TreemapChartComponent.vue'

const lineData = [
  { name: '1월', value: 48 },
  { name: '2월', value: 46 },
  { name: '3월', value: 67 },
  { name: '4월', value: 88 },
  { name: '5월', value: 95 },
  { name: '6월', value: 63 },
  { name: '7월', value: 43 },
  { name: '8월', value: 29 },
  { name: '9월', value: 74 },
  { name: '10월', value: 82 },
  { name: '11월', value: 69 },
  { name: '12월', value: 36 },
]

const barData = [
  { name: '봄', value: 73 },
  { name: '여름', value: 34 },
  { name: '가을', value: 85 },
  { name: '겨울', value: 55 },
]

// const pieData = [
//   { name: '서울', value: 9414093 },
//   { name: '부산', value: 3306993 },
//   { name: '대구', value: 2356416 },
//   { name: '인천', value: 2978749 },
//   { name: '광주', value: 1424818 },
//   { name: '대전', value: 1445126 },
//   { name: '울산', value: 1106015 },
// ]

// const treeData = [
//   {
//     name: 'Asia',
//     children: [
//       {
//         name: 'South Korea',
//         value: 99909,
//       },
//       {
//         name: 'Japan',
//         value: 364485,
//       },
//       {
//         name: 'Jordan',
//         value: 88802,
//       },
//       {
//         name: 'Iraq',
//         value: 437367,
//       },
//     ],
//   },
//   {
//     name: 'Europe',
//     children: [
//       {
//         name: 'UK',
//         value: 241930,
//       },
//       {
//         name: 'France',
//         value: 640427,
//       },
//       {
//         name: 'Hungary',
//         value: 89608,
//       },
//       {
//         name: 'Portugal',
//         value: 91470,
//       },
//     ],
//   },
//   {
//     name: 'America',
//     children: [
//       {
//         name: 'Panama',
//         value: 74340,
//       },
//       {
//         name: 'Honduras',
//         value: 111890,
//       },
//       {
//         name: 'Uruguay',
//         value: 175015,
//       },
//       {
//         name: 'Cuba',
//         value: 109820,
//       },
//     ],
//   },
//   {
//     name: 'Africa',
//     children: [
//       {
//         name: 'Malawi',
//         value: 94080,
//       },
//       {
//         name: 'Ghana',
//         value: 227533,
//       },
//       {
//         name: 'Togo',
//         value: 54385,
//       },
//       {
//         name: 'Benin',
//         value: 114305,
//       },
//     ],
//   },
// ]
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Chart
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        LineChart
      </mark>
      <LineChart :chart-data="lineData" legend="월" />
    </div>
    <hr>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        BarChart
      </mark>
      <BarChart :chart-data="barData" legend="계절" />
    </div>
    <hr>

    <!-- <PieChart :chart-data="pieData" title="Pie Chart" legend /> -->
    <hr>

    <!-- <TreemapChart :chart-data="treeData" title="Treemap Chart" legend /> -->
  </div>
</template>

<style scoped></style>
