import * as fs from 'fs'

import { type EventHandlerRequest, H3Event, parseCookies } from 'h3'

export const useSession = (event: H3Event<EventHandlerRequest>) => {
  const cookies = parseCookies(event)
  const sessionId = cookies?.session
  if (!sessionId) {
    return undefined
  }
  const fPath = `./sessions/${sessionId}`
  let dataSession:any = {}
  try {
    const data = fs.readFileSync(fPath, 'utf8')
    dataSession = JSON.parse(data)
  } catch (err:any) {
    if (err instanceof SyntaxError || err.code === 'ENOENT') {
      dataSession = {
        s_id: sessionId,
        last_seen: '' + Date.now()
      }
      fs.writeFileSync(fPath, JSON.stringify(dataSession))
    } else {
      throw err
    }
  }
  if (sessionId === undefined) { return false } else {
    return new Proxy(dataSession, {
      get: function (oTarget, sKey) {
        // try {
        //   const data = fs.readFileSync(fPath, 'utf8')
        //   oTarget = JSON.parse(data)
        //   return oTarget[sKey] || undefined
        // } catch (err:any) {
        //   if (err instanceof SyntaxError || err.code === 'ENOENT') {
        //     oTarget = {
        //       s_id: sessionId,
        //       last_seen: '' + Date.now()
        //     }
        //     fs.writeFileSync(fPath, JSON.stringify(oTarget))
        //     return oTarget[sKey] || undefined
        //   } else {
        //     throw err
        //   }
        // }
        return oTarget[sKey] || undefined
      },
      set: function (oTarget, sKey, vValue) {
        try {
          oTarget[sKey] = vValue
          fs.writeFileSync(fPath, JSON.stringify(oTarget))
          return true
        } catch (error) {
          return false
        }
      },
      deleteProperty: function (oTarget, sKey) {
        try {
          delete oTarget[sKey]
          fs.writeFileSync(fPath, JSON.stringify(oTarget))
          return true
        } catch (error) {
          return false
        }
      }
    })
  }
}
