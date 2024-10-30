<script setup lang="ts">
import type { IInputProps } from '~/types/custom-input';

const props = withDefaults(defineProps<IInputProps>(), {
  value: '',
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
  useTimer: false,
});

const emit = defineEmits<{
  // (e: 'update:modelValue', value: string | number | undefined): void;
  (e: 'update', value: string | number | undefined): void;
  (e: 'update:validMessage', value: string | number | undefined): void;
  (e: 'blur'): void;
  (e: 'keyupEnter'): void;
  (e: 'focus'): void;
}>();
const inputModelValueRef = ref<HTMLInputElement | null>(null);
const showingPassword = ref<boolean>(false);

const getInputType = computed(() => {
  if (props.type === 'text') return 'text';

  if (props.type === 'number') return 'text';

  if (props.type === 'password') return 'password';
});

const getInputValue = (e: Event) => {
  const event = e.target as HTMLInputElement;
  const numericValue = event.value.replace(/\D/g, '');

  // event.value = event.value.replace(/[^0-9]/g, '');
  formatPhoneNumber(numericValue);
  emit('update', formatPhoneNumber(numericValue));

  emit('update:validMessage', '');
};

const clearInput = () => {
  emit('update:validMessage', '');
  inputModelValueRef.value?.focus();
};

const showPassword = () => {
  showingPassword.value = !showingPassword.value;

  inputModelValueRef.value?.getAttribute('type') === 'password'
    ? inputModelValueRef.value?.setAttribute('type', 'text')
    : inputModelValueRef.value?.setAttribute('type', 'password');
};

const focusInput = () => {
  inputModelValueRef.value?.focus();
};

defineExpose({
  focusInput,
});
</script>

<template>
  <div :style="{ width: `${props.width}` }" class="custom-input">
    <div class="custom-input__wrap">
      <span v-if="props.prefixIcon" @click="inputModelValueRef?.focus()">
        <Icon :name="props.prefixIcon" width="16" height="16" alt="" />
      </span>

      <input
        ref="inputModelValueRef"
        :value="props.value"
        :type="getInputType"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
        :placeholder="props.placeholder"
        :class="{
          'is-error': props.validMessage,
          '!pr-11': props.useDelete || props.validMessage || props.useTimer,
        }"
        :title="props.value?.toLocaleString() ?? ''"
        @blur="emit('blur')"
        @focus="emit('focus')"
        @input="getInputValue"
        @keyup.enter="() => emit('keyupEnter')"
      />

      <button
        v-if="
          props.useDelete &&
          props.value &&
          !props.useCount &&
          !props.disabled &&
          !props.readonly
        "
        type="button"
        class="textfield__suffix-icon"
        @click="clearInput"
      >
        <Icon
          name="delete__circle--7f8"
          width="20"
          height="20"
          alt="내용 초기화"
        />
      </button>
      <p
        v-if="props.validMessage && !props.useTimer"
        class="textfield__suffix-icon"
      >
        <Icon
          name="caution__full--e22"
          width="20"
          height="20"
          alt=""
          aria-hidden="true"
        />
      </p>

      <button
        v-if="
          props.type === 'password' &&
          props.useShowPassword &&
          !props.useCount &&
          !props.disabled &&
          !props.readonly
        "
        type="button"
        class="textfield__suffix-icon"
        @click="showPassword"
      >
        <Icon
          :name="showingPassword ? 'hide-pw' : 'show-pw'"
          width="20"
          height="20"
          :alt="showingPassword ? '비밀번호 감추기' : '비밀번호 보이기'"
        />
      </button>

      <!-- FIXME :: 인증하기에 사용될 타이머 영역입니다. -->
      <p v-if="props.useTimer" class="custom-input__time">4:59</p>

      <!-- <div v-if="props.useCount && props.maxLength">
        <em>{{ props.modelValue.toString().length }}</em>/<span>{{ props.maxLength }}</span>
      </div> -->
    </div>

    <!-- Validation -->
    <p v-if="props.validMessage" class="textfield__valid">
      {{ props.validMessage }}
    </p>
  </div>
</template>
