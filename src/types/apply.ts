export interface IApplyData {
  [key: string]: any
  entrNo: string
  trfEvetOccrDt: string
  svcNm: string
  svcCd: string
  cucoNm: string
  cntcStrtDt: string
  sbscUpldSped: string
  sbscDownSped: string
  occrTrfUpldSpedVlue: number
  occrTrfDownSpedVlue: number
  icspRqstDdayDt: string
  rqstAbleYn: string
  rqstUnableRsn: string
  bizEmpNm: string
  bizEmpHpno: string
  bizEmpEmalAddr: string
  trfEvetOccrYn: string
}

export interface IStandardData {
  [key: string]: any
  icspRqstKdCd: string
  icspRqstDownSped: number
  icspRqstUpldSped: number
}

export interface IStandardParameter {
  entrNo?: string
  svcCd: string
  sbscDownSpedVlue: string | null
  sbscUpldSpedVlue: string | null
  occrTrfDivsCd?: string
  trfEvetOccrDt?: string
  icspRqstKdCd?: string
}


