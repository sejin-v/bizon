import type { ESize } from './enums'

export interface ISelectProps<T> {
  options: T[]
  size?: ESize.EMPTY | ESize.LARGE | ESize.DEFAULT | ESize.LARGE
  clearable?: boolean
  multiple?: boolean
  disabled?: boolean
  placeholder?: string
  modelValue?: string | number | string[] | number[]
}

export interface ITreeSelectProps<T> {
  treeData: T[]
  renderAfterExpand?: boolean
  showCheckbox?: boolean
  checkStrictly?: boolean
  multiple?: boolean
  placeholder?: string
  modelValue?: string | number | string[] | number[]

}

export interface ITree<T> {
  children?: T[]
  disabled?: boolean
}

export interface IOptions {
  value: string | number
  label: string
  disabled?: boolean
}
