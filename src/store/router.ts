import { defineStore } from 'pinia'

export const useRouterStore = defineStore('commonStore', () => {
  const router = useRouter()


  return {
    router,
  }
})

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(usePlaygroundStore, import.meta.hot))
