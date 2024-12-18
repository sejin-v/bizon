<script setup lang="ts">
interface IMenu {
  menuId: string;
  menuName: string;
}
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const defaultMenu = ref(route.fullPath);

const confirmOption = reactive({
  content: '',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  hideCancelButton: false,
});
const menuList = ref<IMenu[]>([
  {
    menuId: '/apply',
    menuName: '비즈온 증속신청',
  },
  {
    menuId: '/my-page',
    menuName: '마이페이지',
  },
  {
    menuId: '/board',
    menuName: '게시판',
  },
]);
const elmenu = ref();

const handleMenuClick = (target: string) => {
  router.push(target);
};

const handleLogout = async () => {
  try {
    confirmOption.content = '로그아웃 하시겠습니까?';
    await openConfirm(confirmOption);
    await request.post(
      '/bizon/api/account/logout',
      {},
      {
        headers: {
          'X-COMMAND': 'P07001',
        },
      }
    );
    userStore.setUser(null);
    router.push('/login');
  } catch (error) {
    console.error(error);
  }
};

const handleClick = () => {
  if (route.fullPath === '/apply') {
    location.reload();
  } else {
    elmenu.value[0].handleClick('/apply');
  }
};
</script>

<template>
  <header class="header">
    <h1 class="logo" @click="handleClick">
      <a>
        <icon
          name="lguplus-logo--gray"
          extension="png"
          alt="LG U+"
          class="mr-2.5"
        />
        <span>비즈온 증속신청</span>
      </a>
    </h1>
    <div class="flex items-center">
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="defaultMenu"
      >
        <el-menu-item
          ref="elmenu"
          v-for="(menu, index) in menuList"
          :key="`mgmt=menu-list-${menu.menuId}`"
          :index="menu.menuId"
          @click="handleMenuClick(menu.menuId)"
        >
          {{ menu.menuName }}
        </el-menu-item>
      </el-menu>

      <button type="button" class="header__user">
        <Icon
          name="user__full--fff"
          width="24"
          height="24"
          alt=""
          aria-hidden="true"
        />
        <span class="ml-1">{{ userStore.user?.cucoChrrNm }}</span>
      </button>
      <button type="button" @click="handleLogout">
        <icon name="logout__line--181" width="24" height="24" alt="로그아웃" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
