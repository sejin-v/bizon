/**
 * Javascript Libarary 들을 늦게 가져오기 위한 기능
 * EventHandler와 연동되어 주요 무거운 라이브러리들을 늦게 가져오게 한다.
 * 전역 이벤트 발생과 같이 연동되어 사용되어야 한다.
 */
// import { EventHandler } from '~/utils/EventManager'
import { scriptLoader } from '~/utils/comlib'
import logger from '~/utils/logger'

const lazyLoadUrlList = [
  {
    url: '/mgmt/js/leaflet/leaflet-src.js',
    libId: 'loaded-leaflet',
    callback: () => {},
  },
]

async function runScript() {
  for (let i = 0; i < lazyLoadUrlList.length; i++) {
    const t = lazyLoadUrlList[i]
    await scriptLoader(t.url, t.libId)
    if (t.callback)
      t.callback()
    // EventHandler.emit(t.key)
    logger.info('[Heavy script] load end -', t.libId)
  }
}

export default () => {
  window.onload = function () {
    logger.info('[Heavy script] Start Loading...', lazyLoadUrlList)
    runScript()
  }
}
