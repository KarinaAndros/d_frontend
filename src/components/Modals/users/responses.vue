<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()

const responses = computed(() => {
  return modalStore.responsesModal
})
</script>

<template>
  Отклики:
  <div
    v-if="responses && responses.length > 0"
    class="applications"
  >
    <div
      v-for="(response, index) in responses"
      :key="index"
      class="profile_application"
    >
      <div v-if="response.user" 
      class="profile_application-title">
        {{ response.user.name }}
      </div>

      <div v-if="response.status">
        статус: {{ response.status.title }}
      </div>
    </div>
  </div>
</template>
