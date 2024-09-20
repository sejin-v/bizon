<script setup lang="ts">
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import type { ILineChartOption } from '~/example/types/chart'

type ECOption = ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
>

const props = withDefaults(defineProps<ILineChartOption>(), {
  chartData: () => [],
  title: '',
  legend: '',
})

echarts.use([
  ToolboxComponent,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  CanvasRenderer,
])

const chartInstanse = ref<null | echarts.ECharts>(null)
const chartRef = ref<null | HTMLDivElement>(null)

const chartOption: ECOption = {
  title: {
    show: !!props.title,
    text: props.title,
    left: 'center',
    textStyle: {
      color: '#000',
      fontWeight: 'bolder',
      fontSize: 25,
    },
  },
  dataset: {
    source: props.chartData,
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    show: !!props.legend,
    top: 45,
    selectedMode: false,
  },
  grid: {
    top: '25%',
    bottom: '10%',
    left: '10%',
    width: '80%',
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        color: '#000',
        fontSize: 15,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '#000',
        fontSize: 15,
      },
    },
  ],
  series: [
    {
      type: 'line',
      name: props.legend || undefined,
      encode: {
        x: 'name',
        y: 'value',
        tooltip: 'value',
      },
      itemStyle: {
        color: '#3f77af',
      },
    },
  ],
}

onMounted(() => {
  chartInstanse.value = echarts.init(chartRef.value)
  chartInstanse.value.setOption(chartOption)
})
onUnmounted(() => {
  chartInstanse.value?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="chart_size" />
</template>

<style scoped>
.chart_size {
  width: 100%;
  height: 400px;
}
</style>
