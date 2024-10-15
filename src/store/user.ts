import { defineStore } from 'pinia'
import type { IUser, IServiceData } from '~/types'


export const useUserStore = defineStore('userStore', () => {
  const user = shallowRef<IUser | null>()
  const setUser = (u: IUser) => {
    user.value = {
      ...u
    }
  }


  const initUser = async () => {
    try {
      const result = await request.get('/bizon/api/customer');
      // const serviceData = await request.get('/bizon/api/speedup/status');
      setUser(result.data.data);
      // setServiceData(serviceData.data)
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
