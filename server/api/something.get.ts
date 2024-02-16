export default defineEventHandler(async (event) => {
  const session = await useSession(event)
  return session?.body ?? { someInput: '' }
})
