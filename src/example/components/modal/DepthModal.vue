<script setup lang="ts">
import { ElTable } from 'element-plus';
import { IModalProps } from '~/types/modal';
import Modal from '../modal/Modal.vue';

interface User {
  date: string
  name: string
  address: string
}

const currentRow = ref()
const inputValue = ref('')
const props = withDefaults(defineProps<IModalProps>(), {
  title: '',
  closeOnClickModal: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'pickData', data?: User): void
}>()

const modalShow = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const handleCurrentChange = (val: User | undefined) => {
  console.log(val?.date, 'Pick🔥')
  currentRow.value = val
}

const handleCancel = () => {
  emit("cancel")
}

const setCurrent = () => {
  emit("pickData", currentRow.value)
  emit("confirm")
}
</script>

<template>
  <div>
    <Modal v-model="modalShow" :title="props.title" @cancel="handleCancel">
      <template #content>
        <div class="form">
          <label class="form__label">Label</label>
          <div class="flex gap-3 w-full">
            <CustomInput v-model="inputValue" max-length="10" placeholder="10글자 내로 입력하세요." size="sm" />
            <button type="button" class="btn__negative--sm">
              버튼
            </button>
          </div>
        </div>
        <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%"
          @current-change="handleCurrentChange">
          <el-table-column type="index" width="50" />
          <el-table-column property="date" label="Date" width="120" />
          <el-table-column property="name" label="Name" width="120" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </template>
      <template #footer>
        <div class="flex">
          <button type="button" class="btn__negative--md" @click="handleCancel">
            취소
          </button>
          <button type="button" class="btn__secondary--md" @click="setCurrent">
            확인
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>
<style scoped></style>
