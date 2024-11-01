import { dayjs, type MessageOptions } from 'element-plus'
import type { IOpenConfirm } from '~/types/confirm'
import type { IOpenAlert } from '~/types/alert'
import type { IMenu } from '~/types/menu'

export const getUniqueId = (length = 16): string => {
  return Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace('.', '')
}

export const openConfirm = ({ content, hideCancelButton, title, confirmButtonText, cancelButtonText, center, closeOnClickModal, closeOnPressEscape, showClose }: IOpenConfirm) => {
  return ElMessageBox.confirm(
    content,
    {
      title,
      confirmButtonText: confirmButtonText || '확인',
      cancelButtonText: cancelButtonText || '취소',
      center: center || false,
      showCancelButton: !hideCancelButton,
      closeOnClickModal: closeOnClickModal || false,
      closeOnPressEscape: closeOnPressEscape || false,
      showClose: showClose || false,
      autofocus: false
    },
  )
}

export const openAlert = ({ message, confirmButtonText, title, showClose, center, closeOnClickModal, closeOnPressEscape }: IOpenAlert) => {
  return ElMessageBox.alert(message, {
    title,
    confirmButtonText: confirmButtonText || '확인',
    showClose: showClose || false,
    center: center || false,
    closeOnClickModal: closeOnClickModal || false,
    closeOnPressEscape: closeOnPressEscape || false,
  })
}

export const openToast = ({ message, type, showClose }: MessageOptions) => {
  return ElMessage(
    {
      message,
      type,
      showClose,
    },
  )
}

export const convertThousandComma = (targetNum: string) => {
  return targetNum.startsWith('0') ? targetNum.replace(/[^0-9]/g, '') : targetNum.replace(/[^0-9]/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const onlyNumbers = (targetNum: string) => {
  return Number(targetNum.replace(/[^0-9]/g, ''))
}

export const blockedText = (targetText: string) => {
  return targetText.replace(/[^a-zA-Z0-9-_]/g, '')
}

export const convertNumberType = (targetNum: string) => {
  return Number(targetNum.replace(/,/g, ''))
}

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length))

  return result
}

export const separateFileNameAndExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return { fileName, fileExtension: '' }
  }
  else {
    return {
      fileName: fileName.slice(0, lastDotIndex),
      fileExtension: fileName.slice(lastDotIndex + 1),
    }
  }
}

export const setFileIconExtension = (fileExtension: string) => {
  const targetExtension = fileExtension.toLowerCase()
  const extensions = {
    img: ['jpg', 'jpeg', 'gif', 'png'],
    hwp: ['hwp', 'hml', 'hwt'],
    pdf: ['pdf'],
    ppt: ['ppt', 'pptx', 'pptm'],
    word: ['doc', 'docx', 'docm', 'dot'],
    xlsx: ['xls', 'xlsx'],
    zip: ['zip'],
  }

  for (const key in extensions) {
    if (extensions[key as keyof typeof extensions].includes(targetExtension))
      return key
  }
  return 'etc'
}

export const findActiveMenuInfo = (menuList: readonly IMenu[], path: string): null | IMenu => {
  const exceptDetailPath = `/${path.split('?')[0].split('/').filter(x => RegExp(/[^0-9]/).test(x)).join('/')}`
  for (const m of menuList) {
    if (m.menuUrl === path || exceptDetailPath === m.menuUrl) {
      return m
    }
    else if (Array.isArray(m.children)) {
      const activeMenu: IMenu | null = findActiveMenuInfo(m.children, path)
      if (!isEmpty(activeMenu))
        return activeMenu
    }
  }
  return null
}

export const numberFormatter = (value: string | number) => {
  const numStr = String(value)
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const numberToKFormatter = (value: string | number): string => {
  if (typeof value === 'string') {
    const num = Number.parseFloat(value)
    if (isNaN(num))
      return String(value)
    value = num
  }
  if (Math.abs(value as number) >= 1000) {
    return (value as number / 1000).toFixed(1)
  }
  return (value as number / 1000).toFixed(1)
}


export function makeRandom() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  const string_length = 4
  let randomString = ''
  for (let i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    randomString += chars[rnum]
  }
  return randomString
}

export function generateLogKey() {
  const dateTimeSecondFormat = dayjs().format('YYYYMMDDHHmmssSSS')
  const first = makeRandom()
  const second = makeRandom()

  return `${dateTimeSecondFormat}${first}${second}`
}
