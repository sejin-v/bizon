// import type { Plugin } from 'vue'
// import type { LoadingProps } from './props'
// import { injectGlobalConfig } from './config'
import Component from './component.vue'

export const ARadialLoading = Component
// export const install: Plugin = (app, defaultConfig?: LoadingProps) => {
//   console.info('installing ARadialLoading', defaultConfig, app, Component)
//   app.component(Component.name!, Component)
//   app.component('ARadialLoading', Component)
//   injectGlobalConfig(app, defaultConfig)
// }

export default {
  ARadialLoading,
  // install,
}
