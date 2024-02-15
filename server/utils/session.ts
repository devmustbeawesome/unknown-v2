import * as fs from 'fs'

import { EventHandlerRequest, H3Event, parseCookies } from 'h3'

export const useSession = (event: H3Event<EventHandlerRequest>) => {
  const cookies = parseCookies(event)
  const sessionId = cookies?.session
  const fPath = `./sessions/${sessionId}`
  const dataSession:any = {}
  if (sessionId === undefined) { return false } else {
    return new Proxy(dataSession, {
      get: function (oTarget, sKey) {
        try {
          const data = fs.readFileSync(fPath, 'utf8')
          oTarget = JSON.parse(data) || {}
          dataSession.sId = sessionId
          dataSession.last_seen = '' + Date.now()
          fs.writeFileSync(fPath, JSON.stringify(dataSession))
          return oTarget[sKey] || undefined
        } catch (err:any) {
          if (err.code === 'ENOENT') {
            oTarget = {
              sId: sessionId,
              last_seen: '' + Date.now()
            }
            fs.writeFileSync(fPath, JSON.stringify(dataSession))
            return oTarget[sKey] || undefined
          } else {
            throw err
          }
        }
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
