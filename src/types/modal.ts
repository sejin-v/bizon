export interface IModalProps {
  modelValue: boolean
  title?: string
  cancelText?: string
  confirmText?: string
  size?: string
  closeOnClickModal?: boolean
  showClose?: boolean
  useFooter?: boolean
}

export interface IModalPopup {
  [key: string]: {
    show: boolean
  }
}

export enum MODAL_SIZE {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  XLARGE = 'xl',
  XXLARGE = '2xl',
  XXXLARGE = '3xl',
}
