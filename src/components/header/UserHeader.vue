<!-- 랜딩페이지 화면 Header (UserLayout) -->
<script setup lang="ts">
import type { IMenu } from '~/types/menu';

const menuList = ref<IMenu[]>([
  {
    menuId: 'ixiSolutionIntro',
    menuName: 'ixi Solution 소개',
    menuIndex: '0',
    children: [
      {
        menuId: 'overview',
        menuName: 'Overview',
        menuIndex: '0-1',
        menuUrl: '/ixi-solution-intro/overview',
      },
      {
        menuId: 'apiReference',
        menuName: 'API Reference',
        menuIndex: '0-2',
        menuUrl: '/ixi-solution-intro/api-reference',
      },
    ],
  },
  {
    menuId: 'ixiStudio',
    menuName: 'ixi-Studio',
    menuIndex: '1',
    children: [
      {
        menuId: 'guide',
        menuName: 'ixi-Studio 가이드',
        menuIndex: '1-1',
        menuUrl: '/ixi-studio/guide',
      },
      {
        menuId: 'ixiStudioGo',
        menuName: 'ixi-Studio 바로가기',
        menuIndex: '1-2',
        menuUrl: '/mgmt/project',
      },
      // {
      //   menuId: 'ixiBestPractices',
      //   menuName: 'ixi Best Practices',
      //   menuIndex: '1-3',
      //   menuUrl: 'https://ixi-techground.lguplus.co.kr/',
      //   isSubMenuCustom: true,
      //   children: [
      //     {
      //       menuId: 'ixiBestPracticesVisionTechnology',
      //       menuName: '비전기술',
      //       menuIndex: '1-3-1',
      //       menuUrl: 'https://vision.ixi-techground.lguplus.co.kr/gallery/',
      //     },
      //     {
      //       menuId: 'ixiBestPracticesVoiceTechnology',
      //       menuName: '음성기술',
      //       menuIndex: '1-3-2',
      //       menuUrl: 'https://ixi-techground.lguplus.co.kr/',
      //     },
      //   ],
      // },
    ],
  },
  {
    menuId: 'solutionQuestion',
    menuName: '솔루션 문의',
    menuIndex: '2',
    children: [
      {
        menuId: 'question',
        menuName: '문의하기',
        menuIndex: '2-1',
        menuUrl: '/solution-question',
      },
    ],
  },
]);
const router = useRouter();
const moveHomePage = () => {
  router.push('/home');
};

const moveNewWebSide = (twoDepthMenuInfo: IMenu) => {
  if (!isEmpty(twoDepthMenuInfo.menuUrl)) window.open(twoDepthMenuInfo.menuUrl);
};

const movePage = (menuUrl: string) => {
  const newWebPageUrlRegex = /http(s)?:\/\/.+/;
  if (newWebPageUrlRegex.test(menuUrl)) window.open(menuUrl);
  else router.push(menuUrl);
};
</script>

<template>
  <header class="header">
    <h1 @click="moveHomePage">
      <Icon name="logo--purple" width="158" height="38" alt="ixi Solusion" />
    </h1>
    <el-menu mode="horizontal" :ellipsis="false" :popper-offset="0">
      <template v-for="menu in menuList" :key="`user-sidebar-${menu.menuId}`">
        <!-- 메뉴가 여러 뎁스로 있는 경우 사용 -->
        <el-sub-menu
          v-if="menu.children"
          :index="menu.menuIndex"
          popper-class="header-menu"
        >
          <template #title>
            <span>{{ menu.menuName }}</span>
          </template>
          <el-menu-item-group>
            <template
              v-for="twoDepthMenu in menu.children"
              :key="`user-sidebar-menu-two-depth-${twoDepthMenu.menuId}`"
            >
              <el-menu-item
                :index="twoDepthMenu.menuIndex"
                :class="{
                  'el-menu-item__link':
                    twoDepthMenu.menuId === 'ixiStudioGo' ||
                    twoDepthMenu.menuId === 'ixiBestPractices',
                }"
                @click="movePage(twoDepthMenu.menuUrl!)"
              >
                <template #title>
                  <span>{{ twoDepthMenu.menuName }}</span>
                </template>
              </el-menu-item>

              <template v-if="twoDepthMenu.children">
                <ul class="el-menu-item__two-depth">
                  <li
                    v-for="threeDepthMenu in twoDepthMenu.children"
                    :key="`user-header-menu-three-depth-${threeDepthMenu.menuId}`"
                    @click="moveNewWebSide(threeDepthMenu)"
                  >
                    {{ threeDepthMenu.menuName }}
                  </li>
                </ul>
              </template>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
        <!-- 메뉴가 1뎁스 인 경우 사용 -->
        <el-menu-item
          v-else
          :index="menu.menuIndex"
          @click="movePage(menu.menuUrl!)"
        >
          <!-- TODO: icon 필요할때 사용 -->
          <!-- <Icon :name="menu.icon" width="20" height="20" /> -->

          <template #title>
            <span>{{ menu.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </header>
</template>

<style lang="scss"></style>
