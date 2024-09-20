<script setup lang="ts">
import { ChartData, ArcElement, ChartOptions, AnimationEvent } from 'chart.js'
import BarChart from '~/components/chartJs/BarChart.vue'
import LineChart from '~/components/chartJs/LineChart.vue'
import DoughnutChart from '~/components/chartJs/DoughnutChart.vue'

const barData = ref<ChartData<'bar', number[], string>>({
  labels: [
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
})

const barOptions = ref<ChartOptions<'bar'>>({
  responsive: false,
})

// Doughnut Chart Data || Options
const doughnutData = ref<ChartData<'doughnut', number[], unknown>>({
  datasets: [
    {
      backgroundColor: ['#41B883', "#ffffff00",],
      data: [70, 100 - 70],
      borderWidth: 0,
      borderRadius: 20,
    }
  ]
})

function drawEndPoint(context: AnimationEvent) {
  const currentChart = context.chart;
  const chartContext = currentChart.ctx;

  const dataPoint = currentChart.getDatasetMeta(0).data[0] as ArcElement;
  const endPointRad = (dataPoint.outerRadius + dataPoint.innerRadius) / 2;
  const END_POINT_RADIUS = 16;
  const textPositionX = dataPoint.x - endPointRad * Math.sin(dataPoint.circumference - Math.PI) - END_POINT_RADIUS;
  const textPositionY = dataPoint.y + endPointRad * Math.cos(dataPoint.circumference - Math.PI) - END_POINT_RADIUS;

  chartContext.fillStyle = "#41B883";
  chartContext.fillText('hello', textPositionX, textPositionY);
}

const doughnutOptions = ref<ChartOptions<"doughnut">>({
  responsive: false,
  cutout: '78%',
  // hover: { mode: {null} },
  animation: {
    onProgress: function (context: AnimationEvent) {
      drawEndPoint(context)
    },
    onComplete: function (context: AnimationEvent) {
      drawEndPoint(context)
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false
    }
  }
})

// Custom Line Chart
const customLineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}

const customLineOptions = {
  responsive: false,
  maintainAspectRatio: false,
  tooltips: {
    intersect: false
  },
}


</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Chart JS
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Line Chart
      </mark>
      <div class="flex justify-center">
        <LineChart :chart-data="customLineData" :chart-options="customLineOptions" />
      </div>
    </div>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Bar Chart
      </mark>
      <div class="flex justify-center">
        <BarChart :chart-data="barData" :chart-options="barOptions" />
      </div>
    </div>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Doughnut Chart
      </mark>
      <div class="flex justify-center">
        <DoughnutChart :chart-data="doughnutData" :chart-options="doughnutOptions" />
      </div>
    </div>

  </div>
</template>


<style scoped></style>