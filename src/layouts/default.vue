<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

const loading = ref<boolean>(true)
const modalStore = useModalStore()
onMounted(() => {
  loading.value = false
})
</script>

<template>
  <Header />
  <RouterView />
  <Modals v-if="modalStore.modalActive" />
</template>
