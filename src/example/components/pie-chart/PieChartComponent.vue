<script setup lang="ts">
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  DatasetComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { PieSeriesOption } from 'echarts/charts'
import type {
  DatasetComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import type { IPieChartOption } from '~/example/types/chart'

type ECOption = ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
>

const props = withDefaults(defineProps<IPieChartOption>(), {
  chartData: () => [],
  title: '',
  legend: false,
})

echarts.use([
  PieChart,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
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
    selectedMode: 'multiple',
    top: 50,
  },
  series: [
    {
      type: 'pie',
      radius: [0, '60%'], // 내부 원의 반지름만 설정하면 파이 차트, 내부 원과 외부 원의 반지름을 설정하면 도넛 차트가 됨
      top: 40,
      encode: {
        itemName: 'name',
        value: 'value',
        tooltip: 'value',
      },
      label: {
        color: '#000',
        fontSize: 15,
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
  <h3>Pie Chart</h3>
  <div ref="chartRef" class="chart_size" />
</template>

<style scoped>
.chart_size {
  width: 100%;
  height: 500px;
}
</style>
