import type { LoadingState, Numberish } from './types'

export interface LoadingProps {
  diameter?: number
  totalSteps?: number
  completedSteps?: number
  startColor?: string
  stopColor?: string
  innerStrokeColor?: string
  strokeWidth?: number
  innerStrokeWidth?: number
  strokeLinecap?: 'inherit' | 'butt' | 'round' | 'square' | undefined
  animateSpeed?: number
  fps?: number
  timingFunc?: string
  isClockwise?: boolean

}
export type PropKey = keyof LoadingProps

export const DEFAULT_PROPS: LoadingState = {
  diameter: 200,
  totalSteps: 10,
  completedSteps: 0,
  startColor: '#00C58E',
  stopColor: '#00E0A1',
  innerStrokeColor: '#2F495E',
  strokeWidth: 10,
  innerStrokeWidth: 10,
  strokeLinecap: 'round',
  animateSpeed: 1000,
  fps: 60,
  timingFunc: 'linear',
  isClockwise: true,
}

export default LoadingProps
