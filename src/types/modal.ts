export interface IModalProps {
  modelValue: boolean
  title?: string
  desc?: string
  cancelText?: string
  confirmText?: string
  size?: string
  closeOnClickModal?: boolean
  showClose?: boolean
  useFooter?: boolean
  disabled?: boolean
}

export interface IModalPopup {
  [key: string]: {
    show: boolean
  }
}

export enum MODAL_SIZE {
  MEDIUM = 'md',
  LARGE = 'lg',
}
