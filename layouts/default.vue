<script lang="ts" setup>
const { mouseX, mouseY } = useMouseMove()
const cssTest = computed(() => {
  return `background:radial-gradient(circle at ${mouseX.value}% ${mouseY.value}%, rgba(0,141,93,1) 0%, rgba(2,4,32,1) 80px)`
})
useHead({
  bodyAttrs: {
    style: cssTest
  }
})
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style>
*{
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
</style>
