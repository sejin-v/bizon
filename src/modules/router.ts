import type { UserModule } from '~/types'

export const install: UserModule = async ({ router }) => {

  const userSotre = useUserStore()
  router.beforeResolve(async (to, from, next) => {

    if (!to.fullPath.includes('/login') && !userSotre.user) userSotre.initUser()
    // >>> setup >>>
    //   const userStore = useUserStore()
    //   if (to.fullPath === '/mgmt/user-mgmt' && !useUserStore().user?.isSuperuser) {
    //     next({ path: '/' })
    //     return
    //   }
    //   if (!userStore.systemMaintenance && (to.fullPath !== '/error-page' && to.fullPath !== '/maintenance-page')) {
    //     // await userStore.checkSystemMaintenance()
    //   }
    //   const isSystemMaintenance = userStore.systemMaintenance
    //   if (userStore.isInit && isSystemMaintenance === 'ERROR') {
    //     next({ path: '/error-page' })
    //   }
    //   else if (userStore.isInit && isSystemMaintenance === 'MAINTENANCE') {
    //     next({ path: '/maintenance-page' })
    //   }
    //   else {
    next()
    //   }
  })
}
