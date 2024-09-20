export interface IGridRowInfo {
  id: number
  manager: IManagerInfo
  progressStatus: IProgressStatus
  issueAndRisk: IIssueAndRisk
  openYn: string
  datepicker: string
  lastResult: string
}

export interface IManagerInfo {
  userId: string
  userName: string
  organizationCode: string
  organizationName: string
}
export interface IProgressStatus {
  statusSno: number
  statusName: string
  statusCode: string
}
export interface IIssueAndRisk {
  labelName: string
  labelContents: string
  colorCode: string
  colorName: string
}
// ------------------- 트리 그리드 ------------------------ //
export interface ITreeGridRowInfo {
  id: string
  parentId?: string
  manager: IManagerInfo
  progressStatus: IProgressStatus
  issueAndRisk: IIssueAndRisk
  openYn: string
  datepicker: string
  lastResult: string
  childList?: ITreeGridRowInfo[]
}

export interface IGridOption {
  useCheckBox: boolean
  useDragColumn: boolean
  useDragRow: boolean
  useColumnResizable: boolean
  headerAlign: string
  rowAlign: string
}
