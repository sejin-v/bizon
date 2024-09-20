export interface IDataSourceTable {
  id: number
  dataSourceType: string
  name: string
  project: {
    id: number
    name: string
  }
  createdAt: string
  createdBy: string
  updatedAt?: string
  updatedBy?: string
  deletedAt?: string
  deletedBy?: string
}
export interface ISearchParams {
  dataSourceType: string
  qType: string
  q: string
  page?: number
  size?: number
  [key: string]: string | number | undefined
}

export interface IFileDetail {
  fileExtension: string
  fileName: string
}

export interface IDataSourceDetail {
  id: string
  name: string
  project: {
    id: number
    name: string
  }
  type: string
  status: string
  createdInfo: string
  updatedInfo?: string
  files?: any[]
  spaceId?: string
  tableId?: string
}

export interface IOriginDataSourceDetail {
  id: string
  name: string
  project: {
    id: number
    name: string
  }
  type: string
  status: string
  createdAt: string
  createdBy: string
  updatedAt?: string
  updatedBy?: string
  files?: ISendFile[]
  spaceId?: string
  tableId?: string
}

export interface ISearchOption {
  label: string
  value: string
}

export interface IApiOption {
  name: string
  type: string
  isActive?: boolean
}

export interface ISendFile {
  id: string
  filename: string
  createdAt: string
  status: string
}
