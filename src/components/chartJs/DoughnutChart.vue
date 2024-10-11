<script lang="ts">
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartData,
// } from 'chart.js';
// import { Doughnut } from 'vue-chartjs'

// ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'DoughnutChart',
  // components: { Doughnut },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<template>
  <!-- <Doughnut ref="chartRef" :data="(chartData as ChartData<'doughnut', number[], unknown>)" :options="chartOptions" /> -->
</template>

<style scoped>
canvas {
  width: 500px;
}
</style>
