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
  rqstStusCd: string
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
  bizEmpHpno: string
  bizEmpNm: string
  bizEmpEmalAddr: string
}



export interface IQuestionData {
  evalQstnCntn: string;
  evalQstnMtchYn: string;
  evalQstnNo: number;
  score: number;
  evalAnsr: string;
}