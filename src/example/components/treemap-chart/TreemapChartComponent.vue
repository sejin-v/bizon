<script setup lang="ts">
import * as echarts from 'echarts/core'
import { TreemapChart } from 'echarts/charts'
import {
  GridComponent,
  // LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { TreemapSeriesOption } from 'echarts/charts'
import type {
  GridComponentOption,
  // LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import type { ITreemapChartOption } from '~/example/types/chart'

type ECOption = ComposeOption<
  | TreemapSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  // | LegendComponentOption
  | ToolboxComponentOption
>

const props = withDefaults(defineProps<ITreemapChartOption>(), {
  chartData: () => [],
  title: '',
  legend: false,
})

echarts.use([
  TreemapChart,
  // LegendComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
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
  tooltip: {},
  series: [
    {
      type: 'treemap',
      data: props.chartData,
      roam: 'move',
      /* TODO: 클릭 시, 차트가 사라지는 것이 아니라 클릭한 노드가 확대되어야 함 */
      // nodeClick: 'zoomToNode',
      nodeClick: false,
      // zoomToNodeRatio: 0.32 * 0.32, // 노드를 클릭하면 트리맵이 적절한 비율로 자동 확대/축소
      breadcrumb: {
        show: true, // roam이 true로 되어 있으면 클릭 시, 경로는 뜸 but 차트가 사라짐
        itemStyle: {
          color: '#999',
          textStyle: {
            color: '#fff',
          },
        },
      },
      leafDepth: 2,
      // visualDimension: 1,
      // visibleMin: 10, // 영역 크기가 이 값(px)보다 작으면 노드가 표시되지 않음 (작은 노드는 숨겨지고 그렇지 않으면 서로 뭉쳐지게 됨)
      // childrenVisibleMin: 20, // 노드의 면적 크기가 이 값(px)보다 작으면 하위 항목이 표시되지 않음 (사용자가 노드를 확대/축소하면 영역이 이 임계값보다 큰 경우 하위 노드 표시됨)
      label: {
        show: true,
        position: 'insideTopLeft',
        distance: 10,
        color: '#fff',
        fontSize: 16,
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 5,
          },
        },
        {
          itemStyle: {
            gapWidth: 1,
          },
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            gapWidth: 1,
            borderColorSaturation: 0.6,
          },
        },
      ],
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
  <h3>Treemap Chart</h3>
  <div ref="chartRef" class="chart_size" />
</template>

<style scoped>
.chart_size {
  width: 100%;
  height: 400px;
}
</style>
