// import NProgress from 'nprogress'
import type { RouteLocationNormalized } from 'vue-router/auto'
import { type UserModule } from '~/types'
import 'nprogress/nprogress.css'

// import ARadialLoading from '~/components/ARadialLoading'

export const install: UserModule = ({ isClient, router, app }) => {
  if (isClient) {
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useProgressStore()
      if (to.path !== from.path)
        store.setIsShowCircularLoading(true)
    })
    router.afterEach(() => {
      const store = useProgressStore()
      store.setIsShowCircularLoading(false)
    })
  }
}
