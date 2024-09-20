import Sortable from 'sortablejs'

export const getCommonDragOption = (draggableItem: string, groupName: string) => {
  return {
    delay: 0,
    animation: 150,
    draggable: draggableItem,
    group: groupName,
  }
}

export const createSortableInstance = (targetHtml: HTMLElement, sortableOption: Sortable.Options) => {
  return Sortable.create(targetHtml, {
    ...sortableOption,
  })
}
