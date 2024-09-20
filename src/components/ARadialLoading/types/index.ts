import type LoadingProps from '../props'
import type { Concrete } from '~/types/utils'

export type Numberish = string | number
export type Nullable<T> = null | T
export type LoadingState = Concrete<LoadingProps>
