import axios from 'axios'
import NProgress from 'nprogress'
// import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from '~/config'

// import type { AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    meta?: {
      useTokenUpdate?: boolean
      useAuth?: boolean
      useResponseAll?: boolean
      useProgress?: boolean
      useToast?: boolean
      logKey?: string
      prefix?: string
      timeout?: number
      useSse?: boolean
      useV2?: boolean
    }
  }
}

const baseUrl: string = import.meta.env.VITE_API_CONTEXT_PATH
const service = axios.create({
  baseURL: baseUrl,
  headers: {
    apiKey: '843227cfb6-fba97-b43b2-fa9c5-c59de18a6e',
  },
})

service.interceptors.request.use(
  async (config) => {

    // progressbar 시작
    NProgress.start()

    return config
  },

  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

// Axios 의 response 인터셉터
service.interceptors.response.use(
  async (response) => {
    // request 결과값이 있을 시 progressbar 종료
    NProgress.done()
    if (response.config.url?.includes('/mock')) {
      const { result } = useMock(response.config.url)
      if (result.value?.status === 400) {
        throw new Error("error");
      }
      response.data = result.value
      return response
    }

    const { router, route } = useRouterStore()
    if (!route.meta.isPublicPath && (response.data.statusCode === 401)) {
      router.push('/login')
      return
    }
    if (response.data.code.substr(0, 2) !== '20') {
      return Promise.reject(response.data)
    }



    return response
  },

  async (error) => {
    // error 발생 시, progressbar 종료
    NProgress.done()

    // if (error.response.data.responseCode === 4000000010 || error.response.data.responseCode === 40100000) {
    //   try {
    //     const refreshedTokens = await service.post('/auth/refresh', {
    //       data: {
    //         // token: localStorage.getItem(KEY_REFRESH_TOKEN) ?? '',
    //       },
    //     })

    //     if (refreshedTokens.data.data) {
    //       // localStorage.setItem(KEY_ACCESS_TOKEN, refreshedTokens.data.data.accessToken)
    //       // localStorage.setItem(KEY_REFRESH_TOKEN, refreshedTokens.data.data.refreshToken)
    //     }
    //     return service(error.response.config)
    //   }
    //   catch (e) {
    //     toLoginPage(router)
    //   }
    // }
    return Promise.reject(error)
  },
)

export default service
