export interface IOpenConfirm {
  content: VNode | string
  hideCancelButton?: boolean
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  center?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
}
