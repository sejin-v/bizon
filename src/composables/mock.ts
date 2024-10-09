
export function useMock(url: string) {

  console.log(url);
  const mockData: any = {
    test: 'test',
    noticeList: [
      {
        title: '증속서비스에 관한 규정 안내',
        date: '2024-05-03',
      },
      {
        title: '이용요금에 관한 안내',
        date: '2024-05-03',
      },
      {
        title: '증속서비스에 관한 규정 안내증속서비스에 관한 규정 안내',
        date: '2024-05-03',
      },
    ],
    login: {
      status: 200,
      httpStatusCode: 200
    },
    getUser: {
      userName: '박세진'
    }
  }
  const result = ref()

  result.value = mockData[url.split('/')[3]]

  return {
    result
  }
}
