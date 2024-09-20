<script lang="ts" setup>
import type { ITextareaProps } from '~/types/custom-textarea';

// Props
const props = withDefaults(defineProps<ITextareaProps>(), {
  modelValue: '',
  value: '',
  width: '',
  height: '',
  maxLength: '',
  placeholder: '',
  readonly: false,
  disabled: false,
})

// Emits
const emit = defineEmits(['update:modelValue']);

// Refs
const textareaHeight = ref('100px');
const HighlightText = ref(props.modelValue);

const textarea = ref()

watchEffect(() => {
  HighlightText.value = props.modelValue;
  setTimeout(() => {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight + 30}px`;
    textareaHeight.value = `${textarea.value.scrollHeight}px`;
  }, 50);
});

// Watchers
watch(() => props.modelValue, (newValue: string) => {
  HighlightText.value = newValue;
});

// Methods
const updateText = (e: InputEvent) => {
  const target = e.target as HTMLTextAreaElement;
  HighlightText.value = target.value;
  adjustTextareaHeight(target);
  emit('update:modelValue', target.value);
};

const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight + 30}px`;
  textareaHeight.value = textarea.style.height;
};

const parsedText = computed(() => {
  const regex = /\{(.*?)\}/g;
  let lastIndex = 0;
  const parts = [];
  let match;

  while ((match = regex.exec(HighlightText.value)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: HighlightText.value.slice(lastIndex, match.index), isHighlighted: false });
    }
    const textInsideBrackets = match[1];
    const isHighlighted = !textInsideBrackets.includes('}');
    parts.push({ text: textInsideBrackets, isHighlighted });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < HighlightText.value.length) {
    parts.push({ text: HighlightText.value.slice(lastIndex), isHighlighted: false });
  }

  return parts;
});
</script>

<template>
  <div class="highlight-textarea" :style="{ height: textareaHeight }" :disabled="props.disabled"
    :readonly="props.readonly" :class="{ 'is-disabled': disabled }">
    <textarea :value="modelValue" @input="updateText" ref="textarea" spellcheck="false" :maxlength="props.maxLength"
      :placeholder="props.placeholder" />
    <div class="highlight-textarea__wrap">
      <template v-for="part in parsedText">
        <span v-if="part.isHighlighted" class="highlight-textarea__light">{{ '{' + part.text + '}' }}</span>
        <span v-else>{{ part.text }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
