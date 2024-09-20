<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ARadialLoading } from '~/components/ARadialLoading'

const store = useProgressStore()
const { progressProps: s } = storeToRefs(store)

onMounted(() => {
  console.log('progress store mounted')
  setTimeout(() => {
    store.setProgressProps({
      ...s.value,
      completedSteps: 5,
    })
  }, 1000)
})

const isClockwiseChanged = (e: any) => {
  store.setProgressProps({ isClockwise: e.target.checked })
}
</script>

<template>
  <div id="app_root">
    <div class="app__header">
      <s />
      <s>Customizable radial progress bar component with gradients and animations!</s>
    </div>

    <div class="app__content">
      <div class="content__radial">
        <ARadialLoading v-bind="s" />
        <div>
          <small>Completed steps: </small>
          <span>{{ s.completedSteps }} / {{ s.totalSteps }}</span>
        </div>
        <div class="content__controls">
          <button :disabled="s.completedSteps <= 0" @click.prevent="() => {
          store.setProgressProps({ completedSteps: s.completedSteps - 1 })
        }">
            Prev
          </button>
          <button :disabled="s.completedSteps >= s.totalSteps" @click.prevent="() => {
          store.setProgressProps({ completedSteps: s.completedSteps + 1 })

        }">
            Next
          </button>
        </div>
      </div>

      <div class="content__options">
        <div class="options__item">
          <Input v-model="s.totalSteps" title="Total steps:" />
          <Input v-model="s.animateSpeed" title="Animate speed:" />
          <Input v-model="s.diameter" title="Diameter:" />
        </div>

        <div class="options__item">
          <Input v-model="s.strokeWidth" title="Stoke width:" />
          <Input v-model="s.innerStrokeWidth" title="Inner Stoke width:" />
        </div>

        <div class="options__item">
          <div class="item__color">
            <span>Start color</span>
            <input v-model="s.startColor" type="color" placeholder="Start color">
          </div>
          <div class="item__color">
            <span>Stop color</span>
            <input v-model="s.stopColor" type="color" placeholder="Stop color">
          </div>
          <div class="item__color">
            <span>Inner stroke color</span>
            <input v-model="s.innerStrokeColor" type="color" placeholder="Inner stroke color">
          </div>
          <div class="item__color">
            <span>Clockwise</span>
            <input type="checkbox" :checked="s.isClockwise" @input="isClockwiseChanged">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app_root {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.app__header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.2rem 1.4rem;
  border-radius: 7px;
  box-shadow: black 0px 0px 10px;
}

.app__header p {
  margin-top: 1rem;
}

.app__header a {
  color: blueviolet;
}

.app__content {
  padding: 1.5rem 2rem;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: black 0px 0px 10px;
}

.content__radial {
  color: red;
}

.content__radial div:first-child {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.content__radial div small {
  font-size: 1.3rem;
  margin-right: 5px;
}

.content__radial div span {
  font-size: 2rem;
}

.content__controls {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
}

.content__controls button {
  outline: none;
  border: none;
  padding: 0.4rem 2rem;
  font-size: 1.3rem;
  border-radius: 2px;
  color: black;
  cursor: pointer;
  transition: transform ease-in 0.14s;
}

.content__controls button:hover:not(:disabled) {
  transform: scale(1.09);
}

.content__controls button:disabled {
  background: rgb(131, 131, 131);
}

.content__options {
  color: cornflowerblue;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.options__item {
  display: flex;
  margin: 1rem 0;
}

.options__item span {
  margin-bottom: 1rem;
}

.options__item .item__color {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  display: flex;
  flex-direction: column;
}

.input-content {
  display: flex;
  align-items: center;
  position: relative;
}

.input span {
  margin-bottom: 0.5rem;
}

.input-content input {
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 1rem;
  padding-left: 1rem;
  height: 40px;
  width: 100px;
  background: rgba(0, 0, 0, 0.103);
  color: brown;
}

@media only screen and (min-width: 1201px) {
  #app_root {
    padding-left: 10rem;
    padding-right: 10rem;

  }
}

@media only screen and (max-width: 1200px) {
  #app_root {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media only screen and (max-width: 800px) {
  #app_root {
    padding-left: 1rem;
    padding-right: 1rem;
  }

}
</style>
