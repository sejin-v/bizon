export interface TUser {
  id: string
  userName: string
  customerNumber?: number
  customerName?: string

  entrNo: string,
  mbrStusCd: string,
  cucoNm: string,
  brno: string | null,
  svcNm: string,
  svcCd: string,
  entrStusCd: string,
  entrStusNm: string,
  sbscUpldSped: string,
  sbscDownSped: string,
  agmtTermYyct: string,
  cntcStrtDt: string,
  cntcEndDt: string,
  cucoChrrNm: string,
  cucoChrrHpno: string,
  cucoEmalAddr: string,
  lastLoginDttm: string | null,
}

