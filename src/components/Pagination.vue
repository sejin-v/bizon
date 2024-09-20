<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate'
import type { ILimitOptions, IPaginationOptions } from '~/types/pagination'

const props = withDefaults(defineProps<IPaginationOptions>(), {
  modelValue: 1,
  totalCount: 100,
  limit: 20,
  limitOptions: () => [50, 100],
  maxPagesShown: 5,
  belowLimitShown: false,
  limitOptionsShown: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', newPage: number): void
  (e: 'changeLimit', newLimit: number): void
}>()

const currentPage = computed({
  get() {
    return props.modelValue
  },
  set(newPage: number) {
    emits('update:modelValue', newPage)
  },
})

const pageLimit = ref<number>(props.limit)
const pageLimitOptions = ref<ILimitOptions[]>([
  {
    name: `${props.limit}개씩 보기`,
    value: props.limit,
  },
])

const getLimitOptions = () => {
  for (const option of props.limitOptions) {
    pageLimitOptions.value.push({
      name: `${option}개씩 보기`,
      value: option,
    })
  }
}

getLimitOptions()

const changeLimit = () => {
  currentPage.value = 1
  emits('changeLimit', pageLimit.value)
}
</script>

<template>
  <div class="pagination">
    <!-- n개씩 보기(Select) -->
    <div v-if="props.limitOptionsShown" class="mr-1">
      <el-select v-if="totalCount > pageLimitOptions[0].value" v-model="pageLimit" size="sm" :style="{ width: '120px' }"
        @change="changeLimit">
        <el-option v-for="option in pageLimitOptions" :key="option.value" :label="option.name" :value="option.value" />
      </el-select>
    </div>

    <!-- Pagination -->
    <template v-if="!props.belowLimitShown">
      <VueAwesomePaginate v-if="props.totalCount > props.limit" v-model="currentPage" :total-items="props.totalCount"
        :items-per-page="props.limit" :max-pages-shown="props.maxPagesShown" :show-breakpoint-buttons="false"
        :show-ending-buttons="true">
        <template #first-page-button>
          <Icon name="double-arrow-l__line--555" width="32" height="32" alt="첫 페이지로 이동" />
        </template>
        <template #last-page-button>
          <Icon name="double-arrow-r__line--555" width="32" height="32" alt="마지막 페이지로 이동" />
        </template>
      </VueAwesomePaginate>
    </template>
    <template v-else>
      <VueAwesomePaginate v-model="currentPage" :total-items="props.totalCount" :items-per-page="props.limit"
        :max-pages-shown="props.maxPagesShown" :show-breakpoint-buttons="false" :show-ending-buttons="true">
        <template #first-page-button>
          <Icon name="double-arrow-l__line--555" width="32" height="32" alt="첫 페이지로 이동" />
        </template>
        <template #last-page-button>
          <Icon name="double-arrow-r__line--555" width="32" height="32" alt="마지막 페이지로 이동" />
        </template>
      </VueAwesomePaginate>
    </template>
  </div>
</template>
