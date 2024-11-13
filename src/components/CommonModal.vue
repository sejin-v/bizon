<script setup lang="ts">
import type { IModalProps } from '~/types/modal';
import { MODAL_SIZE } from '~/types/modal';

const props = withDefaults(defineProps<IModalProps>(), {
  title: '',
  desc: '',
  size: MODAL_SIZE.MEDIUM,
  closeOnClickModal: true,
  confirmText: '확인',
  cancelText: '취소',
  showClose: true,
  useFooter: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();

const modalShow = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value as bolean);
  },
});

// const calculateModalWidth = computed(() => {
//   if (props.size === MODAL_SIZE.SMALL)
//     return 'var(--modal-sm-width)'
//   else if (props.size === MODAL_SIZE.MEDIUM)
//     return 'var(--modal-md-width)'
//   else if (props.size === MODAL_SIZE.LARGE)
//     return 'var(--modal-lg-width)'
//   else if (props.size === MODAL_SIZE.XLARGE)
//     return 'var(--modal-xl-width)'
//   else if (props.size === MODAL_SIZE.XXLARGE)
//     return 'var(--modal-2xl-width)'
//   else return 'var(--modal-md-width)'
// })
const calculateModalWidth = computed(() => {
  if (props.size === MODAL_SIZE.LARGE) return 'var(--modal-width-lg)';
  else return 'var(--modal-width-md)';
});

const cancel = () => {
  emit('cancel');
};

const confirm = () => {
  emit('confirm');
};
</script>

<template>
  <el-dialog
    v-model="modalShow"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnClickModal"
    :width="calculateModalWidth"
    align-center
    destroy-on-close
    :show-close="showClose"
    :append-to-body="true"
    class="popup"
    :class="{ 'detail-popup': desc }"
  >
    <template v-if="title.length" #header>
      <h2>{{ title }}</h2>
      <p v-if="desc">
        {{ desc }}
      </p>
    </template>
    <slot name="content" />

    <template #footer>
      <slot v-if="useFooter" name="footer">
        <button type="button" class="btn__line--negative-md" @click="cancel">
          {{ props.cancelText }}
        </button>
        <button type="button" class="btn__full--primary-md" @click="confirm">
          {{ props.confirmText }}
        </button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped></style>
