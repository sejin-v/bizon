interface ITreeData {
  menuId: string
  menuIndex: number
  menuName: string
  parentMenuId?: string | undefined
}
export interface TreeNode<T> extends ITreeData {
  data: T
  parent: TreeNode<T> | null
  children: TreeNode<T>[]
}
type AnyNode = TreeNode<any>
const newTreeNode = <T>(data: T, tree: ITreeData): TreeNode<T> => {
  return {
    menuId: tree.menuId,
    menuName: tree.menuName,
    parentMenuId: tree.parentMenuId,
    menuIndex: tree.menuIndex,
    data,
    parent: null,
    children: [],
  }
}
const insertChild = (target: AnyNode, node: AnyNode) => {
  target.children.push(node)
  node.parent = target
  target.children.sort((a, b) => a.menuIndex - b.menuIndex)
}

const isParentNode = (parent: AnyNode, child: AnyNode): boolean => {
  return parent.menuId === child.parentMenuId
}

const addTreeToParent = (parent: AnyNode, child: AnyNode): AnyNode | null => {
  if (isParentNode(parent, child)) {
    insertChild(parent, child)
    return parent
  }

  for (let i = 0; i < parent.children.length; i++) {
    const existParent = addTreeToParent(parent.children[i], child)
    if (existParent)
      return existParent
  }
  return null
}

export const useTree = <T extends ITreeData>() => {
  const treeList = shallowRef<TreeNode<T>[]>([])

  function makeTree(d: T[]): TreeNode<T>[] {
    const data = [...d].sort((c, d) => (c.parentMenuId ?? '#') > (d.parentMenuId ?? '#') ? 1 : -1)
    const newTreeArrData: TreeNode<T>[] = []
    for (let i = 0; i < data.length; i++) {
      const treeData = data[i]
      const currNode = newTreeNode(
        treeData,
        {
          menuId: treeData.menuId,
          menuName: treeData.menuName,
          parentMenuId: treeData.parentMenuId,
          menuIndex: treeData.menuIndex,
        })

      if (!currNode.parentMenuId || currNode.parentMenuId === '#') {
        newTreeArrData.push(currNode)
        continue
      }

      for (let i = 0; i < newTreeArrData.length; i++) {
        const exist = newTreeArrData[i]
        const parent = addTreeToParent(exist, currNode)
        if (parent)
          break
      }
    }
    return newTreeArrData
  }

  const setTree = (data: T[]) => {
    treeList.value = makeTree(data)
  }

  return {
    setTree,
    treeList,
    newTreeNode,
  }
}
