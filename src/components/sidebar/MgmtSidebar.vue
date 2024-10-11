<!-- 관리자 화면 Sidebar (MgmtLayout)  -->

<script setup lang="ts">
import type { IMenu, IMenuSetting } from '~/types/menu';
import { useUserStore } from '~/store/user';

withDefaults(defineProps<IMenuSetting>(), {
  menuBackgroundColor: '', // 메뉴 배경색 지정
  menuActiveTextColor: '', // 메뉴 활성화 text 색상 지정
  menuTextColor: '', // 메뉴 text 색상 지정
});

// TODO: 시연때는 관리자 메뉴 하드코딩
const menuList = ref<IMenu[]>([
  {
    menuId: 'projectManagement',
    menuName: 'Project Management',
    menuIndex: '0',
    menuUrl: '/mgmt/project',
    icon: '',
    mgmt: false,
    disabled: false,
  },
  {
    menuId: 'documentManagement',
    menuName: 'Data Source',
    menuIndex: '1',
    menuUrl: '/mgmt/data-source',
    icon: '',
    mgmt: false,
    disabled: false,
  },
  {
    menuId: 'dashboard',
    menuName: 'Dashboard',
    menuIndex: '2',
    menuUrl: '/mgmt/dashboard',
    icon: '',
    mgmt: false,
    disabled: false,
  },
  // {
  //   menuId: 'enginesManagement',
  //   menuName: 'Engines Management',
  //   menuIndex: '3',
  //   menuUrl: '/mgmt/engines-mgmt',
  //   icon: '',
  //   mgmt: false,
  //   disabled: true,
  // },
  {
    menuId: 'userManagement',
    menuName: 'User Management',
    menuIndex: '4',
    menuUrl: '/mgmt/user-mgmt',
    icon: '',
    mgmt: false,
    disabled: false,
  },
  // {
  //   menuId: 'limits',
  //   menuName: 'Limits',
  //   menuIndex: '5',
  //   menuUrl: '/mgmt/limits',
  //   icon: '',
  //   mgmt: false,
  //   disabled: true,
  // },
  // {
  //   menuId: 'wordMgmt.',
  //   menuName: '워드관리',
  //   menuIndex: '4',
  //   menuUrl: '/mgmt/preparing',
  //   icon: '',
  //   mgmt: false,
  //   children: [
  //     {
  //       menuId: 'synonym',
  //       menuName: '동의어',
  //       menuIndex: '4-1',
  //       menuUrl: '/mgmt/word-mgmt/synonym',
  //       icon: '',
  //     },
  //     {
  //       menuId: 'userDictionary',
  //       menuName: '사용자 사전',
  //       menuIndex: '4-2',
  //       menuUrl: '/mgmt/word-mgmt/user-dictionary',
  //       icon: '',
  //     },
  //     {
  //       menuId: 'curate',
  //       menuName: '큐레이팅',
  //       menuIndex: '4-3',
  //       menuUrl: '/mgmt/word-mgmt/curate',
  //       icon: '',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'API-key/Engines Mgt',
  //   menuName: 'API-key/ Engines Mgt.',
  //   menuIndex: '5',
  //   menuUrl: '/mgmt/api-key-mgt',
  //   icon: '',
  //   mgmt: false,
  // },
  // {
  //   menuId: 'requestProofreading',
  //   menuName: '교정신청',
  //   menuIndex: '6',
  //   menuUrl: '/mgmt/request-proof-reading',
  //   icon: '',
  //   mgmt: false,
  // },
  // {
  //   menuId: 'analytics',
  //   menuName: 'Analytics',
  //   menuIndex: '6',
  //   menuUrl: '/mgmt/analytics',
  //   icon: '',
  //   mgmt: true,
  //   disabled: false,
  //   children: [
  //     {
  //       menuId: 'query',
  //       menuName: 'Query',
  //       menuIndex: '6-1',
  //       menuUrl: '/mgmt/analytics/query',
  //       icon: '',
  //     },
  //     {
  //       menuId: 'click',
  //       menuName: 'Click',
  //       menuIndex: '6-2',
  //       menuUrl: '/mgmt/analytics/click',
  //       icon: '',
  //     },
  //     {
  //       menuId: 'feedback',
  //       menuName: 'Feedback',
  //       menuIndex: '6-3',
  //       menuUrl: '/mgmt/analytics/feedback',
  //       icon: '',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'userMgmt',
  //   menuName: '사용자 관리',
  //   menuIndex: '7',
  //   menuUrl: '/mgmt/user-mgmt',
  //   icon: '',
  //   mgmt: true,
  //   disabled: false,
  //   children: [
  //     {
  //       menuId: 'userManagement',
  //       menuName: '사용자 관리',
  //       menuIndex: '7-1',
  //       menuUrl: '/mgmt/user-mgmt/user-management',
  //       icon: '',
  //     },
  //     {
  //       menuId: 'authManagement',
  //       menuName: '권한관리',
  //       menuIndex: '7-2',
  //       menuUrl: '/mgmt/user-mgmt/auth-management',
  //       icon: '',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'safetyMgt',
  //   menuName: 'Safety Mgt.',
  //   menuIndex: '8',
  //   menuUrl: '/mgmt/safety-mgt',
  //   icon: '',
  //   mgmt: true,
  //   disabled: false,
  // },
  // {
  //   menuId: 'billing',
  //   menuName: 'Billing',
  //   menuIndex: '9',
  //   menuUrl: '/mgmt/limits-billing',
  //   icon: '',
  //   mgmt: true,
  //   disabled: false,
  // },
  // {
  //   menuId: 'notice',
  //   menuName: '공지사항',
  //   menuIndex: '10',
  //   menuUrl: '',
  //   icon: '',
  //   mgmt: true,
  //   disabled: false,
  // },
]);

const route = useRoute();

const getActiveMenu = () => {
  let activeMenu = '';

  // const activeMenuInfo = menuList.value.find((m) => {
  //   return m.menuUrl === route.path
  // })

  const activeMenuInfo = findActiveMenuInfo(menuList.value, route.path);
  if (isEmpty(activeMenuInfo)) activeMenu = menuList.value[0].menuIndex;
  else activeMenu = activeMenuInfo!.menuIndex;

  return activeMenu;
};

const router = useRouter();

const moveProjectList = () => {
  router.push('/mgmt/project');
};

const movePage = (menuUrl: string) => {
  const newWebPageUrlRegex = /http(s)?:\/\/.+/;
  if (newWebPageUrlRegex.test(menuUrl)) window.open(menuUrl);
  else router.push(menuUrl);
};

const moveHome = () => {
  router.push('/');
};
const moveGuide = () => {
  // router.push('/ixi-studio/guide')
  window.open('/ixi-studio/guide', '', 'width=1200, height=800');
};

onMounted(() => {
  const { user } = useUserStore();
  if (!user) {
    return;
  }

  if (!user.isSuperuser) {
    for (let i = 0; i < menuList.value.length; i++) {
      const menu = menuList.value[i];
      if (menu.menuId === 'userManagement') {
        menuList.value.splice(i, 1);
      }
    }
  }
});
</script>

<template>
  <div class="sidebar sidebar--mgmt">
    <h1 @click="moveProjectList">
      <Icon name="logo__studio" width="139" height="28" alt="ixi studio" />
    </h1>
    <!-- 메뉴 -->
    <el-menu
      :default-active="getActiveMenu()"
      :background-color="menuBackgroundColor"
      :active-text-color="menuActiveTextColor"
      :text-color="menuTextColor"
      :default-openeds="['4']"
    >
      <template v-for="menu in menuList" :key="`mgmt-sidebar-${menu.menuId}`">
        <div v-if="menu.menuId === 'analytics'" class="sidebar--mgmt-title">
          <Icon name="system-mgmt" width="20" height="20" />
          <span>시스템 관리자</span>
        </div>
        <el-sub-menu
          v-if="menu.children"
          :index="menu.menuIndex"
          :class="{ 'el-menu--mgmt': menu.mgmt === true }"
        >
          <template #title>
            <!-- icon 필요할때 사용 -->
            <!-- <Icon :name="menu.icon" width="20" height="20" /> -->
            <span>{{ menu.menuName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="lowerMenu in menu.children"
              :key="`mgmt-sidebar-menu-lower-${lowerMenu.menuId}`"
              :index="lowerMenu.menuIndex"
              @click="movePage(lowerMenu.menuUrl!)"
            >
              <span>{{ lowerMenu.menuName }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="menu.menuIndex"
          :class="{
            'el-menu--mgmt': menu.mgmt === true,
            'el-menu-item--disabled': menu.disabled,
          }"
          @click="movePage(menu.menuUrl!)"
        >
          <!-- icon 필요할때 사용 -->
          <!-- <Icon :name="menu.icon" width="20" height="20" /> -->
          <template #title>
            <span>{{ menu.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>

    <button type="button" class="sidebar__btn--shorcut" @click="moveGuide">
      <span> ixi-Studio 가이드 </span>
      <Icon
        name="direct__line--333"
        width="20"
        height="20"
        alt=""
        class="ml-1"
      />
    </button>
    <button type="button" class="sidebar__btn--shorcut" @click="moveHome">
      <span> ixi Solution 돌아가기 </span>
      <Icon
        name="direct__line--333"
        width="20"
        height="20"
        alt=""
        class="ml-1"
      />
    </button>
  </div>
</template>

<style lang="scss"></style>
