export interface ISearchTree {
  [key: string]: any
}
export interface ITree<T> {
  children?: T[]
  disabled?: boolean
}

export interface ITreeProps<T> {
  treeData: T[]
  draggable?: boolean
  showCheckbox?: boolean
  defaultExpandAll?: boolean
  filterNode?: boolean
  nodeKey?: string

}

export interface ICheckedList {
  checkedKeys: string[]
  checkedNodes: string[]
  halfCheckedKeys: string[]
  halfCheckedNodes: string[]
}
