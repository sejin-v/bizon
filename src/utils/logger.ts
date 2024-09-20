// const DEBUG_MODE = !!framework.logger.debug
// if (process.env.NODE_ENV !== 'development') {
//   DEBUG_MODE = false;
// }
const PREFIX = {
  START: '[UI START]',
  END: '[UI END]',
  INFO: '[UI]',
}

const logger = {
  isDebug: true,
  init(debug: boolean) {
    this.isDebug = debug
    // // 초기화
    // if (DEBUG_MODE)
    //   console.log('=== Global Logging Info ===')
    // if (DEBUG_MODE)
    //   console.log('navigator.userAgent:', navigator.userAgent)
    // store.dispatch('SetAgentType')
    // 전체 Click Event 처리
  /*
    document.addEventListener('click', function(e) {
      if (DEBUG_MODE) console.log('GLOBAL:', e.target)
      // 일반 버튼 클릭 시 처리 이벤트
      if (e.target.type === 'button') {
        if (DEBUG_MODE) {
          console.log('Button Action ID:', e.target.dataset.actionId)
        }
        if (DEBUG_MODE) console.log('Currnet Menu Name:', store.state.log.name)
      }
    })
    */
  },
  // 로딩 간 로딩 내역 출력 전용
  start(label: string, ...logParams: any[]) {
    if (!this.isDebug)
      return
    console.time(label)
    console.log(PREFIX.START, ...logParams)
  },
  end(label: string, ...logParams: any[]) {
    if (!this.isDebug)
      return
    console.timeEnd(label)
    console.log(PREFIX.END, ...logParams)
  },
  info(...logParams: any[]) {
    if (!this.isDebug)
      return
    console.log(PREFIX.INFO, ...logParams)
  },
}

export default logger
