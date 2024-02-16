<script lang="ts" setup>
// import type { FetchError } from 'ofetch'
interface SomeData {
  someInput: string
}

const someData = reactive(await $fetch<SomeData>(
  '/api/something',
  {
    method: 'get'
  }
))
// const formdata = reactive(savedformdata)
const sendData = async () => {
  await $fetch('/api/something', {
    method: 'POST',
    body: someData
  })
}
</script>

<template>
  <div>
    <form action="/something/" method="post">
      <input v-model="someData.someInput" type="text" name="someInput" @input="sendData">
    </form>
    <p>{{ someData }}</p>
  </div>
</template>

<style scoped></style>
