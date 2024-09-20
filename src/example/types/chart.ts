export interface IChartData {
  name: string
  value: number
}

export interface ILineChartOption {
  chartData: IChartData[]
  title?: string
  legend?: string
}

export interface IBarChartOption {
  chartData: IChartData[]
  title?: string
  legend?: string
}

export interface IPieChartOption {
  chartData: IChartData[]
  title?: string
  legend?: boolean
}

export interface IChartNode {
  name: string
  value?: number
  children?: IChartNode[]
}

export interface ITreemapChartOption {
  chartData: IChartNode[]
  title?: string
  legend?: boolean
}
