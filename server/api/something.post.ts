export default defineEventHandler(async (event) => {
  const session = await useSession(event)
  const body = await readBody(event)
  session.body = body
  return { body }
})
