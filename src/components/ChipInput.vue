<script setup lang="ts">
import { ElTag } from 'element-plus'

interface IChipInputProps {
  modelValue: string
  width?: string
  placeholder?: string
  tagMax?: number
  color?: string
}

const props = withDefaults(defineProps<IChipInputProps>(), {
  modelValue: '',
  width: '100%',
  placeholder: '',
  tagMax: 10,
  color: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const chipValue = ref(props.modelValue)
const errorMessage = reactive({
  limit: `추가할 수 있는 칩의 개수는 최대 ${props.tagMax}개입니다.`,
})

const confirmOptions = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: true,
})

const tags = ref<string[]>([])

const chipTagEvent = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value
  if (inputValue.length) {
    chipValue.value = ''
    if (tags.value.length < props.tagMax) {
      tags.value.push(inputValue)
    }
    else {
      confirmOptions.content = errorMessage.limit
      openConfirm(confirmOptions)
    }
    emit('update:modelValue', tags.value.join(','))
  }
}

const convertToString = () => {
  return tags.value.join(',')
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
  emit('update:modelValue', convertToString())
}

const handleSetTags = () => {
  const tagsValue = props.modelValue.trim() ? props.modelValue.split(',').map(item => item.trim()) : []
  tags.value = tagsValue
  chipValue.value = ''
  return tagsValue
}

defineExpose({
  convertToString,
})

watch(
  () => props.modelValue,
  (newValue: string) => {
    chipValue.value = newValue
    handleSetTags()
  },
)

onMounted(() => {
  if (props.modelValue) {
    handleSetTags()
  }
})
</script>

<template>
  <div :style="{ width: `${props.width}` }" class="custom-input">
    <input v-model="chipValue" :placeholder="props.placeholder" @keyup.enter="chipTagEvent">
    <ElTag v-for="(tag, index) in tags" :key="index" :color="props.color" closable @close="removeTag(index)">
      {{ tag }}
    </ElTag>
  </div>
</template>
