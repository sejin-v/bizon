import { acceptHMRUpdate, defineStore } from 'pinia'
import type LoadingProps from '~/components/ARadialLoading/props'
import { DEFAULT_PROPS } from '~/components/ARadialLoading/props'
import type { LoadingState } from '~/components/ARadialLoading/types'

export const useProgressStore = defineStore('progressStore', () => {
  const progressProps = ref<LoadingState>(DEFAULT_PROPS)
  const setProgressProps = (props: Partial<LoadingProps>) => {
    // _progressProps.value = props
    progressProps.value = {
      ...progressProps.value,
      ...props,
    }
  }

  const _isShowCircularLoading = ref(false)
  const isDisableOutside = ref(false)
  const isShowCircularLoading = computed(() => _isShowCircularLoading.value)
  const setIsShowCircularLoading = (isShow: boolean) => {
    _isShowCircularLoading.value = isShow
  }
  const circularChildDefault = ref<string>()

  return {
    setProgressProps,
    progressProps,
    isShowCircularLoading,
    setIsShowCircularLoading,
    circularChildDefault,
    isDisableOutside,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProgressStore, import.meta.hot))
