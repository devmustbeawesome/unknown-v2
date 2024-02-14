export default defineEventHandler(async (event) => {
  const session = await useSession(event)
  session.test = 'test'
  return session.last_seen
})
