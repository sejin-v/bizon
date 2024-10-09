<script setup lang="ts">
interface Props {
  label?: string
  required?: boolean
  group?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  group: false,
})
</script>

<template>
  <div class="form__item">
    <label v-if="label" class="form__label" :class="{ 'is-required': required }">{{ props.label }}</label>
    <div v-if="group" class="form__group">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
