import * as fs from 'fs/promises'
import { EventHandlerRequest, H3Event, parseCookies, setCookie } from 'h3'

export const useSession = async (event: H3Event<EventHandlerRequest>) => {
  const cookies = parseCookies(event)
  const sessionId = cookies?.session
  // setCookie(event, 'token', 'test')

  const fPath = `./sessions/${sessionId}`
  let dataSession:any = {}
  try {
    const data = await fs.readFile(fPath, 'utf8')
    dataSession = JSON.parse(data) || {}
    dataSession.last_seen = '' + Date.now()
    await fs.writeFile(fPath, JSON.stringify(dataSession))
  } catch (err:any) {
    if (err.code === 'ENOENT') {
      dataSession = {
        sId: sessionId,
        last_seen: '' + Date.now()
      }
      await fs.writeFile(fPath, JSON.stringify(dataSession))
    } else {
      throw err
    }
  }
  return new Proxy(dataSession, {
    get: function (oTarget, sKey) {
      return oTarget[sKey] || undefined
    },
    set: function (oTarget, sKey, vValue) {
      if (sKey in oTarget) {
        return false
      }
      oTarget[sKey] = vValue
      fs.writeFile(fPath, JSON.stringify(oTarget))
      return true
    }
    // deleteProperty: function (oTarget, sKey) {
    //   if (sKey in oTarget) {
    //     return false
    //   }
    //   return oTarget.removeItem(sKey)
    // },
    // enumerate: function (oTarget, sKey) {
    //   return oTarget.keys()
    // },
    // iterate: function (oTarget, sKey) {
    //   return oTarget.keys()
    // },
    // ownKeys: function (oTarget, sKey) {
    //   return oTarget.keys()
    // },
    // has: function (oTarget, sKey) {
    //   return sKey in oTarget || oTarget.hasItem(sKey)
    // },
    // hasOwn: function (oTarget, sKey) {
    //   return oTarget.hasItem(sKey)
    // },
    // defineProperty: function (oTarget, sKey, oDesc) {
    //   if (oDesc && 'value' in oDesc) {
    //     oTarget.setItem(sKey, oDesc.value)
    //   }
    //   return oTarget
    // },
    // getPropertyNames: function (oTarget) {
    //   return Object.getPropertyNames(oTarget).concat(oTarget.keys())
    // },
    // getOwnPropertyNames: function (oTarget) {
    //   return Object.getOwnPropertyNames(oTarget).concat(oTarget.keys())
    // },
    // getPropertyDescriptor: function (oTarget, sKey) {
    //   const vValue = oTarget[sKey] || oTarget.getItem(sKey)
    //   return vValue
    //     ? {
    //         value: vValue,
    //         writable: true,
    //         enumerable: true,
    //         configurable: false
    //       }
    //     : undefined
    // },
    // getOwnPropertyDescriptor: function (oTarget, sKey) {
    //   const vValue = oTarget.getItem(sKey)
    //   return vValue
    //     ? {
    //         value: vValue,
    //         writable: true,
    //         enumerable: true,
    //         configurable: false
    //       }
    //     : undefined
    // },
    // fix: function (oTarget) {
    //   return 'not implemented yet!'
    // }
  })
}
