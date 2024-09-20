import type { App } from 'vue'
import { inject } from 'vue'
import type { LoadingProps } from './props'

const CONFIG_SYMBOL = Symbol('map-real-global-config')
export const injectGlobalConfig = (app: App, config?: LoadingProps) => {
  app.provide(CONFIG_SYMBOL, config)
}
export const useGlobalConfig = () => {
  return inject<LoadingProps>(CONFIG_SYMBOL, {} as LoadingProps)
}
