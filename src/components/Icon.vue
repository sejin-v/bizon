<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
  },
  extension: {
    type: String,
    default: 'svg',
    required: false,
  },
  alt: {
    type: String,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
})
const imageSrc = computed(() => {
  return `/icon/${props.name}.${props.extension}`
})
</script>

<template>
  <img :src="imageSrc" class="cm-icon" :alt="alt" :style="`width: ${width}px; height: ${height}px;`" />
</template>
