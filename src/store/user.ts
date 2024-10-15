import { defineStore } from 'pinia'
import type { IUser, IServiceData } from '~/types'


export const useUserStore = defineStore('userStore', () => {
  const user = shallowRef<IUser | null>()
  const setUser = (u: IUser) => {
    user.value = {
      ...u
    }
  }

  const serviceData = shallowRef<IServiceData | null>()
  const setServiceData = (service: IServiceData) => {
    serviceData.value = {
      ...service
    }
  }

  const initUser = async () => {
    try {
      const result = await request.get('/mock/api/customer');
      const serviceData = await request.get('/mock/api/speedup/status');
      setUser(result.data);
      setServiceData(serviceData.data)
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
    setServiceData,
    serviceData,
    logout,
    initUser
  }
})
