<script setup lang="ts">
import type { ISelectProps } from '~/types/select-box'
import type { ITreeData } from '~/example/types/select-box'
import { ESize } from '~/types'

const props = withDefaults(defineProps<ISelectProps<ITreeData>>(), {
  options: () => [],
  size: ESize.DEFAULT,
  clearable: false,
  multiple: false,
  disabled: false,
  placeholder: '',
  readonly: false,
  modelValue: '',
})

const emit = defineEmits([
  'update:modelValue',
  'change',
])

const selectBoxRef = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <el-select v-model="selectBoxRef" :placeholder="props.placeholder" :size="props.size" :clearable="props.clearable"
    :multiple="props.multiple" :disabled="props.disabled"
    :class="{ 'el-select__reset': clearable, 'el-select__readonly': props.readonly }"
    @change="(value) => emit('change', value)">
    <!-- FIXME: 시연 후 수정 필요 -->
    <el-option v-for=" item in props.options " :key="item.value" :label="item.label" :value="item.value"
      :disabled="item.disabled">
      <p v-if="!multiple" :class="{ 'text-gray-300': item.disabled }">
        {{ item.label }}
      </p>
      <el-checkbox v-else v-model="selectBoxRef" :value="item.value" :disabled="item.disabled"
        @click="(e: any) => e.preventDefault()">
        {{ item.label }}
      </el-checkbox>
    </el-option>
  </el-select>
</template>

<style lang="scss"></style>
