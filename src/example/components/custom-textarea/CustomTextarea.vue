<script setup lang="ts">
import type { ITextareaProps } from '~/types/custom-textarea'

const props = withDefaults(defineProps<ITextareaProps>(), {
  modelValue: '',
  width: '100',
  height: '100',
  maxLength: '',
  placeholder: '',
  validMessage: '',
  readonly: false,
  disabled: false,
  useCount: false,
  useDelete: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focus'): void
}>()
const textareaValueRef = ref<HTMLInputElement | null>(null)

const textareaValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  emit('update:modelValue', event.value)
}

// const clearValue = () => {
//   emit('update:modelValue', '')
//   textareaValueRef.value?.focus()
// }

const focusTextarea = () => {
  textareaValueRef.value?.focus()
}

defineExpose({
  focusTextarea,
})
</script>

<template>
  <div :style="{ width: `${props.width}%` }" class="custom-textarea">
    <div class="custom-textarea__wrap">
      <textarea ref="textareaValueRef" :value="modelValue" :style="{ height: `${props.height}px` }"
        :readonly="props.readonly" :disabled="props.disabled" :maxlength="props.maxLength"
        :placeholder="props.placeholder" :class="{ 'custom-textarea__error': props.validMessage }"
        @input="textareaValue" @blur="emit('blur')" @focus="emit('focus')" />
      <!-- FIXME 개발자: 사용하지 않아 임시로 주석처리했습니다 -->
      <!-- <button type="button" class="custom-textarea__reset" @click="clearValue">
        <Icon v-if="props.useDelete && props.modelValue && !props.readonly && !props.disabled"
          name="delete__circle--eae" width="24" height="20" alt="내용 초기화" />
      </button> -->
      <!-- <div v-if="props.useCount && props.maxLength">
          <em>{{ typeof props.modelValue === 'string' ? props.modelValue.length : 0 }}</em>/<span>{{ props.maxLength
            }}</span>
        </div> -->

      <!-- Validation -->
      <div v-if="props.validMessage" class="custom-textarea__valid">
        <Icon name="caution__full--fe3" width="24" height="24" alt="" />
        <p>
          {{ props.validMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
