// import { acceptHMRUpdate, defineStore } from 'pinia'
// import { EChatUtil } from '~/types/enums'

// export const useLayoutStore = defineStore('layoutStore', () => {
//   const _layout = ref()
//   const layout = computed(() => {
//     return _layout.value ?? EChatUtil.QUESTION
//   })
//   const setLayout = (target: string) => {
//     _layout.value = target
//   }

//   function $reset() {
//     _layout.value = 'QUESTION'
//   }

//   return {
//     layout,
//     setLayout,
//     $reset,
//   }
// })

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
