<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartData } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<template>
  <Bar ref="chartRef" :options="chartOptions" :data="(chartData as ChartData<'bar', number[], string>)" />
</template>

<style scoped>
canvas {
  width: 800px;
  height: 400px;
}
</style>