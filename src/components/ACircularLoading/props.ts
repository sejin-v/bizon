import type { Concrete } from '~/types/utils'

export interface LoadingCircularProps {
  disableClickOutside?: boolean
}
export type PropKey = keyof LoadingCircularState
export type LoadingCircularState = Concrete<LoadingCircularProps>
export const DEFAULT_PROPS: LoadingCircularState = {
  disableClickOutside: false,
}
