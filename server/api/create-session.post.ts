import * as fs from 'fs/promises'
import md5 from 'md5'
export default defineEventHandler(async () => {
  const sessionId = md5('' + Date.now())
  const fPath = `./sessions/${sessionId}`
  try {
    const data = await fs.readFile(fPath, 'utf8')
    const newData = JSON.parse(data) || {}
    newData.last_seen = '' + Date.now()
    await fs.writeFile(fPath, JSON.stringify(newData))
  } catch (err:any) {
    if (err.code === 'ENOENT') {
      const newData = {
        sId: sessionId,
        last_seen: '' + Date.now()
      }
      await fs.writeFile(fPath, JSON.stringify(newData))
    } else {
      throw err
    }
  }
  return { sessionId }
})
