import { defineStore } from 'pinia'
import type { TUser } from '~/types/user'


export const useUserStore = defineStore('userStore', () => {
  const user = shallowRef<TUser | null>()
  const setUser = (u: TUser) => {
    user.value = {
      ...u
    }
  }
  const initUser = async () => {
    try {
      const result = await request.get('/mock/api/getUser');
      setUser(result.data);
    } catch (e: any) {
      console.error(e);

    }
  }
  const logout = () => {
    user.value = null
  }
  return {
    setUser,
    user,
    logout,
    initUser
  }
})
