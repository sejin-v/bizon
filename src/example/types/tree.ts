import type { ITree } from '~/types/tree'

export interface ITreeData extends ITree<ITreeData> {
  id: number
  label: string
}
