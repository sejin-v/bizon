export interface IPaginationOptions {
  modelValue?: number
  currentPage?: number
  totalCount: number
  limit?: number
  limitOptions?: number[]
  maxPagesShown?: number
  belowLimitShown?: boolean
  limitOptionsShown?: boolean
}

export interface ILimitOptions {
  name: string
  value: number
}
