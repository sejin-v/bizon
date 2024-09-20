<script setup lang="ts">
import type { IInputProps } from '~/types/custom-input'

const props = withDefaults(defineProps<IInputProps>(), {
  modelValue: '',
  type: 'text',
  width: '100%',
  maxLength: '',
  prefixIcon: '',
  placeholder: '',
  validMessage: '',
  readonly: false,
  disabled: false,
  useShowPassword: false,
  useComma: false,
  useCount: false,
  useDelete: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
  (e: 'blur'): void
  (e: 'keyupEnter'): void
  (e: 'focus'): void
}>()
const inputModelValueRef = ref<HTMLInputElement | null>(null)
const showingPassword = ref<boolean>(false)

const getInputType = computed(() => {
  if (props.type === 'text')
    return 'text'

  if (props.type === 'number')
    return 'text'

  if (props.type === 'password')
    return 'password'
})

const getInputValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  let formatValue: string | number = event.value
  if (props.type === 'number')
    formatValue = onlyNumbers(event.value)

  if (props.type === 'number' && props.useComma)
    formatValue = convertThousandComma(event.value)

  emit('update:modelValue', formatValue)
}

const clearInput = () => {
  emit('update:modelValue', '')
  inputModelValueRef.value?.focus()
}

const showPassword = () => {
  showingPassword.value = !showingPassword.value

  inputModelValueRef.value?.getAttribute('type') === 'password'
    ? inputModelValueRef.value?.setAttribute('type', 'text')
    : inputModelValueRef.value?.setAttribute('type', 'password')
}

const focusInput = () => {
  inputModelValueRef.value?.focus()
}

defineExpose({
  focusInput,
})
</script>

<template>
  <div :style="{ width: `${props.width}` }" class="custom-input">
    <div class="custom-input__wrap">
      <span v-if="props.prefixIcon" @click="inputModelValueRef?.focus()">
        <Icon :name="props.prefixIcon" width="16" height="16" alt="" />
      </span>
      <input ref="inputModelValueRef" :value="modelValue" :type="getInputType" :readonly="props.readonly"
        :disabled="props.disabled" :maxlength="props.maxLength" :placeholder="props.placeholder"
        :class="{ 'custom-input__error': props.validMessage }" :title="modelValue?.toLocaleString() ?? ''"
        @blur="emit('blur')" @focus="emit('focus')" @input="getInputValue" @keyup.enter="() => emit('keyupEnter')">
      <button v-if="props.useDelete && modelValue && !props.useCount && !props.disabled && !props.readonly"
        type="button" class="custom-input__reset" @click="clearInput">
        <Icon name="delete__circle--eae" width="16" height="16" alt="내용 초기화" />
      </button>
      <button
        v-if="props.type === 'password' && props.useShowPassword && !props.useCount && !props.disabled && !props.readonly"
        type="button" @click="showPassword">
        <Icon v-if="showingPassword" name="icon__show-eye" width="24" height="20" alt="비밀번호 보이기" />
        <Icon v-else name="icon__hide-eye" width="24" height="20" alt="비밀번호 감추기" />
      </button>
      <div v-if="props.useCount && props.maxLength">
        <em>{{ props.modelValue.toString().length }}</em>/<span>{{ props.maxLength }}</span>
      </div>
    </div>

    <!-- Validation -->
    <div v-if="props.validMessage" class="custom-input__valid">
      <Icon name="caution__full--fe3" width="24" height="24" alt="" />
      <p>
        {{ props.validMessage }}
      </p>
    </div>
  </div>
</template>
