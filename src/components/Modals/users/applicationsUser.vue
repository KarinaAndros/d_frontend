<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
</script>

<template>
  <div v-if="modalStore.modal.applications && modalStore.modal.applications.length > 0">
    <div
      v-for="app in modalStore.modal.applications"
      :key="app.id"
      class="profile_application"
    >
      <div class="profile_application-title">
        {{ app.title }}
      </div>
      <div
        v-if="app.description"
        class="profile_application-description"
      >
        {{ app.description }}
      </div>
      <div class="flex_row">
        <div class="profile_application-date">
          {{ app.new_date }}
        </div>
        <div class="profile_application-date">
          {{ app.new_time }}
        </div>
        <div class="profile_application-status">
          {{ app.status.title }}
        </div>
      </div>
    </div>
  </div>
</template>
