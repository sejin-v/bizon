<script lang="ts" setup>
import type { StyleValue } from 'vue'
import type { LoadingCircularProps } from './props'
import { DEFAULT_PROPS } from './props'
import { Z_INDEX } from '~/config'

const props = withDefaults(defineProps<LoadingCircularProps>(), DEFAULT_PROPS)
const containerStyle = computed<StyleValue>(() => {
  const result: StyleValue = {
    // zIndex: Z_INDEX.loadingCircular,
    zIndex: Z_INDEX.loadingCircular,
  }
  if (props.disableClickOutside) {
    result.position = 'fixed'
    result.top = 0
    result.left = 0
    result.right = 0
    result.bottom = 0
  }
  else {
    result.position = 'absolute'
    result.top = '41.5%'
    result.left = '45.5%'
  }
  return result
})
const store = useProgressStore()
const { circularChildDefault } = toRefs(store)
watchEffect(() => {
  console.log('circularChildDefault.value: ', circularChildDefault.value)
})
</script>

<template>
  <div>
    <div id="loading-container" class=" flex flex-col justify-center align-middle items-center" :style="containerStyle">
      <div id="loading-wrapper">
        <div class="loading" />
        <div class="loading-text font-mono font-bold text-sm">
          {{ circularChildDefault && circularChildDefault.length > 1 ? circularChildDefault : 'Loading..' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#loading-container {

  #loading-wrapper {
    position: relative;
    height: 10rem;
    width: 10rem;

    &:hover .loading {
      border-color: transparent #E45635 transparent #E45635;
    }
  }

  * {
    width: 100%;
    height: 100%;
  }

  .loading {
    border: 2px solid transparent;
    border-radius: 100%;
    // border-color: #ff19f5 transparent #9e4eff transparent;
    border-color: $pink-50 transparent $purple-50 transparent;
    animation: rotate-loading 1s linear 0s infinite normal;
    transform-origin: 50% 50%;

  }

  &:hover,
  & .loading {
    transition: all 0.5s ease-in-out;
  }

  .loading-text {
    animation: loading-text-opacity 2s linear 0s infinite normal;
    opacity: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 45%;
  }
}

@keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
  }

  60% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-text-opacity {
  0% {
    opacity: 0
  }

  20% {
    opacity: 0
  }

  50% {
    opacity: 1
  }

  100% {
    opacity: 0
  }
}
</style>
