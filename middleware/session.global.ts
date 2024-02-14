export default defineNuxtRouteMiddleware(async () => {
  if (process.client) {
    const cookies = useCookie('session', { maxAge: 60 * 60 })
    if (!cookies.value) {
      const {
        sessionId
      } = await $fetch<{sessionId:string}>('/api/create-session/', {
        method: 'post'
      })
      cookies.value = sessionId
    }
  }
})
