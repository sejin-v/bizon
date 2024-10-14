
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
    customer: {
      // id: 'sejin',
      // userName: '박세진',
      // customerNumber: '******4561',
      // customerName: 'AA반도체',
      //
      entrNo: "abacus",
      mbrStusCd: "N",
      cucoNm: "abacus",
      brno: null,
      svcNm: "back",
      svcCd: "back",
      entrStusCd: "C",
      entrStusNm: "없음",
      sbscUpldSped: "100",
      sbscDownSped: "100",
      agmtTermYyct: "200",
      cntcStrtDt: "없음",
      cntcEndDt: "없음",
      cucoChrrNm: "애버커스",
      cucoChrrHpno: "01011111111",
      cucoEmalAddr: "abacus@back.d",
      lastLoginDttm: null

    },
    speedup: {
      "entrNo": "530002522556",					// 가입 번호
      "trfEvetOccrDttm": "20240924",			// 트래픽 이벤트 발생 일시
      "svcNm": "Standard",						// 서비스 명
      "cucoNm": "AA반도체",						// 고객사 명
      "cntcStrtDt": "20240924",					// 서비스 개통 일자
      "sbscUpldSped": "300000000",				// 청약 트래픽 업로드 속도
      "sbscDownSped": "500000000",				// 청약 트래픽 다운로드 속도
      "occrTrfUpldSpedVlue": "300000000",		// 발생 트래픽 업로드 속도값
      "occrTrfDownSpedVlue": "500000000",		// 발생 트래픽 다운로드 속도값
      "icspRqstDdayDt": "20241024",				// 증속 신청 기한 일자
      "trfEvetOccrYn": "Y",						// 트래픽 이벤트 발생 여부(Y: 임계치 초과, N: 정상)
      "rqstAbleYn": "Y",						// 신청 가능 여부(Y: 가능, N: 불가)
      "rqstUnableRsn": "5일 기한 초과",			// 신청 불가 사유
      "icspRqstKdCd": "3",					// 증속 신청 유형 코드(1: 다운로드, 2: 업로드, 3: 업다운로드)
      "icspRqstUpldSped": "300000000",			// 증속 신청 업로드 속도
      "icspRqstDownSped": "500000000",			// 증속 신청 다운로드 속도
      "bizEmpNm": "김비즈",						// 영업 담당자 명
      "bizEmpHpno": "010-8080-1234",			// 영업 담당자 휴대폰번호
      "bizEmpEmalAddr": "bizon@lguplus.co.kr"	// 영업 담당자 이메일 주소

    }

  }
  const result = ref()

  result.value = mockData[url.split('/')[3]]

  return {
    result
  }
}
