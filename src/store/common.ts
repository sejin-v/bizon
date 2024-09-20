import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', () => {
  const _isEdited = ref(false)
  const isEdited = computed(() => _isEdited.value)
  const setIsEdited = (value: boolean) => {
    _isEdited.value = value
  }


  return {
    isEdited,
    setIsEdited
  }
})

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(usePlaygroundStore, import.meta.hot))
