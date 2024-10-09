<script setup lang="ts">
interface IMenu {
  menuId: string
  menuName: string
}
const menuList = ref<IMenu[]>([
  {
    menuId: 1,
    menuName: '비즈온 증속 신청',
  },
  {
    menuId: 2,
    menuName: '마이페이지',
  },
  {
    menuId: 3,
    menuName: '게시판',
  },
])
</script>

<template>
  <header class="header">
    <h1 class="logo">
      <a href="javascript:void(0);">
        <icon name="logo-lg" alt="LG U+" class="mr-2.5" />
        <span>비즈온 증속 신청</span>
      </a>
    </h1>
    <div class="flex items-center">
      <el-menu mode="horizontal" :ellipsis="false">
        <el-menu-item v-for="(menu, index) in menuList" :key="`mgmt=menu-list-${menu.menuId}`" :index="String(index)">
          {{ menu.menuName }}
        </el-menu-item>
      </el-menu>

      <button type="button" class="header__user">
        <Icon name="user__full--fff" width="24" height="24" alt="" aria-hidden="true" />
        <span class="ml-1">홍길동</span>
      </button>
      <button type="button">
        <icon name="logout__line--181" width="24" height="24" alt="로그아웃" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
