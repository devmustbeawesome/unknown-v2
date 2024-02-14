<script lang="ts" setup>
const { data } = useFetch('/api/something')
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>

<style scoped></style>
