import {
  StringifyObjectsHook,
  createLogger,
} from 'vue-logger-plugin'
import { type UserModule } from '~/types'

// const ServerLogHook: LoggerHook = {
//   async run(event: LogEvent) {
//     if (event.level === 'log')
//       return console.error('not support log level : log')

//     if (event.level !== 'debug' && event.argumentArray.length > 1) {
//       const formData = new FormData()
//       const txt = event.argumentArray.join('&&')
//       formData.set('logName', 'io-web-app')
//       formData.set('category', 'client-side')
//       formData.set('txt', txt)
//       formData.set('severity', event.level)
//       await _axios.post('/log/ioLogging', formData)
//       console.log(`[${event.level}]`, event.argumentArray)
//     }
//   },
// }

export const logger = createLogger({
  enabled: true,
  level: import.meta.env.PROD ? 'info' : 'debug',
  prefixFormat: ({ level, caller }) =>
    caller
      ? `[${level.toUpperCase()}] [${caller?.fileName}:${
          caller?.functionName
        }:${caller?.lineNumber}]`
      : `[${level.toUpperCase()}]`,
  beforeHooks: [StringifyObjectsHook],
  // afterHooks: [ServerLogHook],
})

const PREFIX = {
  START: '[UI START]',
  END: '[UI END]',
  INFO: '[UI]',
}

logger.start = (label: string, ...logParams: any) => {
  if (import.meta.env.PROD)
    return
  console.time(label)
  console.log(PREFIX.START, ...logParams)
}
logger.end = (label: string, ...logParams: any) => {
  if (import.meta.env.PROD)
    return
  console.timeEnd(label)
  console.log(PREFIX.END, ...logParams)
}

export const install: UserModule = ({ app }) => {
  app.use(logger)
}
