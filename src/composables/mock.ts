
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
      id: 'sejin',
      userName: '박세진',
      customerNumber: '******4561',
      customerName: 'AA반도체',
      // startDate: '2024-10-09',
      // generatedTraffic: [100, 220],
      // subscriptionTraffic: [300, 500],
      // trafficStatus: '임계치 초과',
      // availability: true,
      // limitDate: '2024-11209',
      // note: '연간 신청가능 2회중 0회 신청 완료'
    },
    getApply: {
      id: 'sejin',
      userName: '박세진',
      service: '비즈온 Standard',
      customerNumber: '******4561',
      customerName: 'AA반도체',
      startDate: '2024-10-09',
      generatedTraffic: [100, 220],
      subscriptionTraffic: [300, 500],
      trafficStatus: '임계치 초과',
      availability: true,
      limitDate: '2024-11209',
      note: '연간 신청가능 2회중 0회 신청 완료'
    }
  }
  const result = ref()

  result.value = mockData[url.split('/')[3]]

  return {
    result
  }
}
