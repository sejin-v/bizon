<script lang="ts">
import { createTypedChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  LineController
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// LineWithLine
class LineWithLineController extends LineController {
  static override id = 'line-with-line'

  public override draw() {
    super.draw()

    if (this.chart?.tooltip && this.chart.tooltip.opacity > 0) {
      const { ctx, tooltip, chartArea: { bottom }, scales: { x, y } } = this.chart
      const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
      const yScale = y.top

      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#07C'
      ctx.moveTo(xCoor, yScale)
      ctx.lineTo(xCoor, bottom)
      ctx.stroke()
      ctx.restore()
    }
  }
}

const LineWithLineChart = createTypedChart(
  'line-with-line' as 'line',
  LineWithLineController
)

export default {
  name: 'LineChart',
  components: { LineWithLineChart },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => { }
    }
  },
  mounted() {
    // console.log(
    //   this.$refs.chartRef
    // );
  },
}
</script>

<template>
  <div class="chart__line">
    <LineWithLineChart ref="chartRef" :data="(chartData as ChartData<'line', number[], string>)"
      :options="chartOptions" />
  </div>
</template>


<style scoped></style>