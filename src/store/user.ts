import { defineStore } from 'pinia'
import type { TUser } from '~/types/auth'


export const useUserStore = defineStore('userStore', () => {
  const user = shallowRef<TUser | null>()
  const setUser = (u: TUser) => {
    user.value = {
      id: u.id,
      name: u.name,
      isSuperuser: u.isSuperuser,
    }
  }

  const logout = () => {
    user.value = null
  }

  return {
    setUser,
    user,
    logout,
  }
})
