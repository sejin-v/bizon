import { defineStore } from 'pinia'

export const useRouterStore = defineStore('commonStore', () => {
  const router = useRouter()
  const route = useRoute()


  return {
    router, route
  }
})

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(usePlaygroundStore, import.meta.hot))
