// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
  eslint: {
    lintOnStart: false

  },
  stylelint: {
    lintOnStart: false

  }
})
