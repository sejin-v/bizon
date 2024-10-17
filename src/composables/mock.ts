
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
    standard: {
      "icspRqstKdCd": "03",						// 증속 신청 유형 코드(1: 다운로드, 2: 업로드, 3: 업다운로드)
      "icspRqstDownSped": 300,					// 증속 신청 다운로드 속도(MB)
      "icspRqstUpldSped": 400						// 증속 신청 업로드 속도(MB)
    },
    status: {
      "entrNo": "100000000001",					// 가입 번호
      "trfEvetOccrDt": "20241014",				// 트래픽 이벤트 발생 일자
      "svcNm": "Basic",							// 서비스 명(Basic/Standard/Premium)
      "svcCd": "basic",							// 서비스 코드(basic/standard/premium)
      "cucoNm": "AA반도체",						// 고객사 명
      "cntcStrtDt": "20240901",					// 서비스 개통 일자
      "sbscUpldSped": "200",						// 청약 트래픽 업로드 속도(MB)
      "sbscDownSped": "100",						// 청약 트래픽 다운로드 속도(MB)
      "occrTrfUpldSpedVlue": "190",				// 발생 트래픽 업로드 속도값(MB)
      "occrTrfDownSpedVlue": "190",				// 발생 트래픽 다운로드 속도값(MB)
      "icspRqstDdayDt": "20241019",				// 증속 신청 기한 일자
      "rqstAbleYn": "Y",							// 신청 가능 여부(Y: 가능, N: 불가)
      "rqstUnableRsn": "신청 가능",				// 신청 불가 사유
      "bizEmpNm": "김비즈",						// 영업 담당자 명
      "bizEmpHpno": "010-1001-1001",				// 영업 담당자 휴대폰번호
      "bizEmpEmalAddr": "biz01@lguplus.co.kr",	// 영업 담당자 이메일 주소
      "trfEvetOccrYn": "Y"						// 트래픽 이벤트 발생 여부(Y: 임계치 초과, N: 정상)
    },
    request: {
      "timestamp": "2024-10-14 16:23:17.035",
      "statusCode": 201,
      // status: 400,
      "code": "20121001",
      "message": "속도 변경 신청 접수가 완료되었습니다.",
      "data": null
    },
    items:
      [{
        "evalQstnNo": 1,
        "evalQstnMtchYn": "Y",
        "evalQstnCntn": "비즈온 증속 서비스를 얼마나 만족하시나요?"
      },
      {
        "evalQstnNo": 2,
        "evalQstnMtchYn": "Y",
        "evalQstnCntn": "트래픽 초과 알림 방식(문자/이메일)에 대해 얼마나 만족하시나요?"
      },
      {
        "evalQstnNo": 3,
        "evalQstnMtchYn": "Y",
        "evalQstnCntn": "홈페이지를 통한 증속절차에 얼마나 만족하시나요?"
      },
      {
        "evalQstnNo": 4,
        "evalQstnMtchYn": "Y",
        "evalQstnCntn": "증속 체험 후 실제 사용중인 서비스 속도를 변경 신청할 의향이 있으신가요?"
      },
      {
        "evalQstnNo": 5,
        "evalQstnMtchYn": "Y",
        "evalQstnCntn": "(모바일 사용자 중) 모바일을 통한 서비스 신청에 만족하시나요?"
      },
      {
        "evalQstnNo": 6,
        "evalQstnMtchYn": "N",
        "evalQstnCntn": "더 나은 서비스를 위해 추가적으로 하고 싶은 말씀을 자유롭게 써주시기 바랍니다. (선택)"
      }]

  }
  const result = ref()

  result.value = mockData[url.split('/')[4]]

  return {
    result
  }
}
