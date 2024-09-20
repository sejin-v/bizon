import type { ITree } from '~/types/select-box'

export interface ITreeData extends ITree<ITreeData> {
  value: string | number
  label: string
}
export interface IOptions {
  value: string | number
  label: string
  disabled?: boolean
}
