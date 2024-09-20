interface IKey {
  id: string
  key: string
}

interface IMetric {
  apiCount: any
  tokenCount: any
}

interface IPromptConfig {
  id: string
  name: string
  promptId: string
}

interface IDeployment {
  isDeployed: boolean
}

interface IAgentEngineConfig {
  agentEngineId: string
  id: string
  type: string
}

interface IMeta {
  idx: number
  isActionable: boolean
  isDisplay: boolean
  isConfluence?: boolean
}

export interface IDataSourceConfig {
  id: number
  name: string
  type: string
  targetIds?: string
  dataSourceId?: string
}

export interface IModelConfig {
  id: string
}

export interface IDataSource {
  type: string
  name: string
  targetIds?: string
  spaceId?: string
  tableId?: string
  files?: File[]
}

export interface IProject {
  id: number
  name: string
  description: string
  key: IKey
  metric: IMetric
  modelConfig: IModelConfig
  promptConfig: IPromptConfig
  agentEngineConfig: IAgentEngineConfig
  apiAgentEngineConfig: IAgentEngineConfig
  dataSourceConfigs: IDataSourceConfig[]
  deployment: IDeployment
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  deployUrl: string
  deletedAt: string | null
  deletedBy: string | null
}

export interface IProjectSearchPrams {
  q?: string | null
  size?: number | null
  page: number
}

export interface IModelsCode {
  name: string
  id: string
  isActive: boolean
  meta: IMeta
  disabled?: boolean
}
export interface IDataSourcesCode {
  name: string
  type: string
  isActive: boolean
  disabled?: boolean
}

export interface IOption {
  value: string
  label: string
  isConfluence?: boolean
}

export interface IDataSourceList {
  id?: number
  dataSourceType: string
  name: string
  targetIds?: string
  deletedAt?: string | null
  deletedBy?: string | null
}

export interface IParameter {
  temperature: number
  maxLength: number
  topP: number
  presencePanalty: number
  frequencyPanalty: number
}

export interface ITemplateSetting {
  guideLine: string
  guideLineInput: string
  manual: string
  manualInput: string
}

export interface IVariableSetting {
  valueText: string
  valueTextInput: string
  valueSession: string
  valueUserQuery: string
  valueUserQueryInput: string
  valueDocument: string
  maxResult: string
  threshold: string
}
