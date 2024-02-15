import * as fs from 'fs'
import md5 from 'md5'
import { parseCookies, setCookie } from 'h3'
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (_html, { event }) => {
    const cookies = parseCookies(event).session
    if (!cookies) {
      const sessionId = md5('' + Date.now())
      const fPath = `./sessions/${sessionId}`
      const newData = {
        sId: sessionId,
        last_seen: '' + Date.now()
      }
      fs.writeFileSync(fPath, JSON.stringify(newData))
      setCookie(event, 'session', sessionId,
        {
          maxAge: 60 * 60,
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
    }
  })
})
