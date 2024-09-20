// TODO: 나중에 소스 정리시 삭제 필요
export interface IMenuDetail {
  menuId: string
  menuIndex: number
  menuName: string
  menuUrl: string
  parentMenuId: string
}

export interface IMenuSetting {
  sideMenuList?: readonly IMenu[]
  menuBackgroundColor?: string // 메뉴 배경색 지정
  menuActiveTextColor?: string // 메뉴 활성화 text 색상 지정
  menuTextColor?: string // 메뉴 text 색상 지정
}

export interface IMenu {
  menuId: string
  menuName: string
  menuIndex: string
  menuUrl?: string
  isSubMenuCustom?: boolean
  icon?: string
  iconHover?: string
  children?: IMenu[]
  mgmt?: boolean
  disabled?: boolean
}
