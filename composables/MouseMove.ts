export const useMouseMove = () => {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const updateMouseCoodinates = (event: { clientX: number; clientY: number }) => {
    mouseX.value = Math.round(event.clientX / document.documentElement.clientWidth * 10000) / 100
    mouseY.value = Math.round(event.clientY / document.documentElement.clientHeight * 10000) / 100
  }
  onMounted(() => window.addEventListener('mousemove', updateMouseCoodinates))
  onUnmounted(() => window.removeEventListener('mousemove', updateMouseCoodinates))
  return { mouseX, mouseY }
}
