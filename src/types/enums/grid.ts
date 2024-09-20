export enum DragTableTargetClassName {
  EL_TBODY_WRAPPER = '.el-table__body-wrapper tbody',
  ROW_DRAGGABLE = '.el-table__row',
  EL_THEAD_WRAPPER = '.el-table__header-wrapper thead tr',
  TH_DRAGGABLE = 'th',
}

export enum DragTreeTableTargetClassName {
  PARENT_EL_TBODY_WRAPPER = '.el-table__body-wrapper tbody',
  CHILD_EL_TBODY_WRAPPER = '.el-table__body-wrapper tbody tr .el-table__body-wrapper tbody',
  ROW_DRAGGABLE = '.el-table__row',
  PARENT_EL_THEAD_WRAPPER = '.el-table__header-wrapper thead tr',
  CHILD_EL_THEAD_WRAPPER = '.el-table__body-wrapper tbody tr .el-table__header-wrapper thead tr',
  TH_DRAGGABLE = 'th',
}

export enum CellTextAlignKind {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}
