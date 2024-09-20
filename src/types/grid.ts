import type { CellTextAlignKind } from '~/types/enums/grid'

export interface IGridData {
  [k: string]: any
  childList?: IGridData[]
}
export interface IColumn {
  property: string
  label: string
  minWidth?: number
  type?: string
  sortable?: boolean
  draggable: boolean
  rowAlign?: string | CellTextAlignKind
}

export interface IDragIndexInfo {
  oldIndex: number | undefined
  newIndex: number | undefined
}

export interface IRowClassNameArgument {
  row: IGridData
  rowIndex: number
}
