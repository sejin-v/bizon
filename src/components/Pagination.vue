<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate';
import type { ILimitOptions, IPaginationOptions } from '~/types/pagination';

const props = withDefaults(defineProps<IPaginationOptions>(), {
  modelValue: 1,
  totalCount: 0,
  limit: 10,
  limitOptions: () => [50, 100],
  maxPagesShown: 5,
  belowLimitShown: false,
  limitOptionsShown: false,
});

const emits = defineEmits<{
  (e: 'update:modelValue', newPage: number): void;
  (e: 'changeLimit', newLimit: number): void;
}>();

const currentPage = computed({
  get() {
    return props.modelValue;
  },
  set(newPage: number) {
    emits('update:modelValue', newPage);
  },
});

const pageLimit = ref<number>(props.limit);
const pageLimitOptions = ref<ILimitOptions[]>([
  {
    name: `${props.limit}개씩 보기`,
    value: props.limit,
  },
]);

const getLimitOptions = () => {
  for (const option of props.limitOptions) {
    pageLimitOptions.value.push({
      name: `${option}개씩 보기`,
      value: option,
    });
  }
};

getLimitOptions();

const changeLimit = () => {
  currentPage.value = 1;
  emits('changeLimit', pageLimit.value);
};

const totalPages = computed(() => {
  return Math.ceil(props.totalCount / props.limit);
});

</script>

<template>
  <div class="pagination">
    <!-- n개씩 보기(Select) -->
    <!-- <div v-if="props.limitOptionsShown" class="mr-1">
      <el-select v-if="totalCount > pageLimitOptions[0].value" v-model="pageLimit" :style="{ width: '120px' }" @change="changeLimit">
        <el-option v-for="option in pageLimitOptions" :key="option.value" :label="option.name" :value="option.value" />
      </el-select>
    </div> -->

    <!-- Pagination -->
    <template v-if="!props.belowLimitShown">
      <VueAwesomePaginate
        v-if="props.totalCount > props.limit"
        v-model="currentPage"
        :total-items="props.totalCount"
        :items-per-page="props.limit"
        :max-pages-shown="props.maxPagesShown"
        :show-breakpoint-buttons="false"
        :show-ending-buttons="true"
        :class="{
          'pl-[34px]': currentPage !== totalPages,
          'pr-[34px]': currentPage !== 1,
        }"
      >
        <template #prev-button>
          <Icon
            v-if="currentPage !== 1"
            name="arrow-l__line--525"
            width="32"
            height="32"
          />
          <Icon
            v-else
            name="arrow-l__line--d2d"
            width="32"
            height="32"
            class="cursor-not-allowed"
          />
        </template>
        <template #next-button>
          <Icon
            v-if="currentPage !== totalPages"
            name="arrow-l__line--525"
            width="32"
            height="32"
            class="rotate-180"
          />
          <Icon
            v-else
            name="arrow-l__line--d2d"
            width="32"
            height="32"
            class="rotate-180 cursor-not-allowed"
          />
        </template>
        <template #first-page-button>
          <Icon
            name="d-arrow-l__line--525"
            width="32"
            height="32"
            alt="첫 페이지로 이동"
          />
        </template>
        <template #last-page-button>
          <Icon
            name="d-arrow-l__line--525"
            width="32"
            height="32"
            alt="마지막 페이지로 이동"
            class="rotate-180"
          />
        </template>
      </VueAwesomePaginate>
    </template>

    <template v-else>
      <VueAwesomePaginate
        v-model="currentPage"
        :total-items="props.totalCount"
        :items-per-page="props.limit"
        :max-pages-shown="props.maxPagesShown"
        :show-breakpoint-buttons="false"
        :show-ending-buttons="true"
        :class="{
          'pl-[34px]': currentPage !== totalPages,
          'pr-[34px]': currentPage !== 1,
        }"
      >
        <template #prev-button>
          <Icon
            v-if="currentPage !== 1"
            name="arrow-l__line--525"
            width="32"
            height="32"
          />
          <Icon
            v-else
            name="arrow-l__line--d2d"
            width="32"
            height="32"
            class="cursor-not-allowed"
          />
        </template>
        <template #next-button>
          <Icon
            v-if="currentPage !== totalPages"
            name="arrow-l__line--525"
            width="32"
            height="32"
            class="rotate-180"
          />
          <Icon
            v-else
            name="arrow-l__line--d2d"
            width="32"
            height="32"
            class="rotate-180 cursor-not-allowed"
          />
        </template>
        <template #first-page-button>
          <Icon
            name="d-arrow-l__line--525"
            width="32"
            height="32"
            alt="첫 페이지로 이동"
          />
        </template>
        <template #last-page-button>
          <Icon
            name="d-arrow-l__line--525"
            width="32"
            height="32"
            alt="마지막 페이지로 이동"
            class="rotate-180"
          />
        </template>
      </VueAwesomePaginate>
    </template>
  </div>
</template>
