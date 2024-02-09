<script lang="ts" setup>
const { data: test } = await useFetch('/api/test/')
</script>

<template>
  <div>
    Api: {{ test }}
  </div>
</template>

<style scoped></style>
