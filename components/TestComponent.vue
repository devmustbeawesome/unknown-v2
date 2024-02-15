<script lang="ts" setup>
const { data } = useFetch('/api/something')
const formdata = reactive({ someinput: '' })
const sendData = async () => {
  await $fetch('/api/something', {
    method: 'POST',
    body: formdata
  })
}
</script>

<template>
  <div>
    {{ data }}
    <form action="/something/" method="post">
      <input v-model="formdata.someinput" type="text" name="someInput" @input="sendData">
      <p>{{ formdata.someinput }}</p>
    </form>
  </div>
</template>

<style scoped></style>
