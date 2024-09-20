import type { IMenuDetail } from '~/types/menu'

export interface ILoginData {
  userId: string
  password: string
}

export interface ILoginTimer {
  currentTime: number
  interval: null
}

export interface ILoginError {
  useError: boolean
  errorMsg: string
}

export interface IUsePopup {
  findPassword: boolean
  findId: boolean
  changePassword: boolean
  joinPopup: boolean
}

export interface ILoginResponseWrap<T> {
  httpStatusCode: number
  code: string
  message: string
  body: T
}

export interface ILoginApiBody {
  userName: string
  userGroupName: string
  mqttPassword: string
  mqttDeviceId: string
  data: ILoginDetailBody[]
}

export interface ISessionApiBody extends Omit<ILoginApiBody, 'data'> {
  menuScreenInfo: IMenuDetail[]
}

export interface ILoginDetailBody {
  menuId: string
  parentMenuId: string
  menuName: string
  menuIndex: number
  mainScrinId: string
  menuUrl: string
  screenList: ILoginScreenList[]
}

export interface ILoginScreenList {
  screenId: string
  screenName: string
  screenPath: string
  mainScreenYn: string
}
