<script setup lang="ts">
const loading = ref<boolean>(true)
onMounted(() => {
  loading.value = false
})
</script>

<template>
  <Header />
  <RouterView />
</template>
