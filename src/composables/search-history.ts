import type { LocationQueryRaw } from 'vue-router'

interface IParam {
  toQuery: () => LocationQueryRaw
  loadQuery: (q: LocationQueryRaw) => void
  handleSearch: () => Promise<void>
}
// 검색시 라우터에 쿼리를 추가하여 검색
// 라우터 변경시 쿼리를 이용하여 검색
// TODO: 한 페이지에서 분리된 두 컴포넌트가 검색기능을 사용 할 경우, 고려가 필요하다.
export function useSearchHist({ handleSearch, toQuery, loadQuery }: IParam) {
  const route = useRoute()
  const router = useRouter()

  watch(
    () => route.fullPath,
    () => {
      loadQuery(route.query)
      handleSearch()
    },
    { immediate: true },
  )

  const pushSearch = async () => {
    router.push({
      name: route.name,
      query: toQuery(),
    })
  }

  return {
    pushSearch,
    route,
    router,
  }
}
