<script lang="ts" setup>
const store = useProgressStore()
const { isShowCircularLoading, circularChildDefault, isDisableOutside } = toRefs(store)

const handleClickButton = () => {
  store.setIsShowCircularLoading(!isShowCircularLoading.value)
  if (isShowCircularLoading.value) {
    setTimeout(() => {
      store.setIsShowCircularLoading(false)
    }, 5000)
  }
}
</script>

<template>
  <div class="flex flex-col h-screen pt-10 justify-start align-middle items-center gap-6">
    <button type="button" :class="isShowCircularLoading ? 'btn__negative--md' : 'btn__secondary--md'"
      @click="handleClickButton">
      {{ isShowCircularLoading ? '정지' : '시작' }}
    </button>
    <div class="form">
      <label class="form__label">defaultSlotInput</label>
      <CustomInput v-model="circularChildDefault" placeholder="Default slot." use-delete />
    </div>
    <div class="form">
      <span class="form__label">외부 이벤트 Disable 여부</span>
      <span><el-switch v-model="isDisableOutside" />{{ isDisableOutside }}</span>
    </div>
  </div>
</template>
