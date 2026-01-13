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
      <div class="profile_application-title">
        {{ response.user.name }}
      </div>

      <div>
        статус: {{ response.status.title }}
      </div>
    </div>
  </div>
</template>
