import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export * from './enums'
export * from './grid'
export * from './login'
export * from './board'
export * from './toast'
export * from './modal'
export * from './apply'
export * from './user'
export * from './my-page'
