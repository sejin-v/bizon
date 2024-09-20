<script setup lang="ts">
import { storeToRefs } from 'pinia';

interface ITabItem {
  id: string;
  title: string;
  isSuperUser?: boolean;
}

const props = withDefaults(
  defineProps<{
    items: ITabItem[];
    defaultSelect: string;
  }>(),
  {
    items: () => [],
    defaultSelect: '',
  }
);
// const router = useRouter()

const tabs = ref<ITabItem[]>([]);
const currentTab = ref<string>(props.defaultSelect);

// const goProjectList = () => {
//   router.push('/mgmt/project')
// }
const confirmOption = reactive({
  content:
    '이동 하시겠습니까? 저장하지 않으면, 입력하신 정보는 사라지게 됩니다.',
  center: true,
  closeOnPressEscape: true,
});
const commStore = useCommonStore();
const { isEdited } = storeToRefs(commStore);
const handleClick = (selectTab: string) => {
  if (selectTab !== currentTab.value) {
    if (isEdited.value) {
      openConfirm(confirmOption).then(() => {
        currentTab.value = selectTab;
      });
    } else {
      currentTab.value = selectTab;
    }
  }
};

watchEffect(() => {
  tabs.value = props.items;
});

const currentTabValue = computed(() => currentTab.value);
</script>

<template>
  <div class="mgmt__box">
    <div class="tab">
      <template v-for="(tab, index) in tabs" :key="`tabs-${index}`">
        <button
          v-if="tab.isSuperUser"
          class="tab__menu"
          :class="{ 'tab__menu--active': currentTab === tab.id }"
          @click="handleClick(tab.id)"
        >
          {{ tab.title }}
        </button>
      </template>
    </div>
    <div class="tab__cont">
      <slot :current-tab="currentTabValue" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
