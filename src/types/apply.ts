export interface TApplyData {
  [key: string]: any
  id: string
  customerNumber: number
  customerName: string
  startDate: string
  generatedTraffic: [number, number]
  subscriptionTraffic: [number, number]
  trafficStatus: string
  availability: boolean
  limitDate: string
  note: string
  service: string
}

