
export interface IParameter {
  name: string,
  description: string,
  type: string,
  required?: boolean
}

export interface IAction {
  name: string,
  description: string,
  apiUrl: string,
  parameters: IParameter[] | any
}