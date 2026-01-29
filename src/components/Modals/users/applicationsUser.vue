<script setup lang="ts">
import type { UserType } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'
import { useResponseStore } from '@/stores/responses'

const modalStore = useModalStore()
const responseStore = useResponseStore()
const authStore = useAuthStore()

const authUser = ref<UserType | null>()

function newResponse(id: number) {
  responseStore.storeResponse(id)
}

// watches
watch(() => authStore.authUserData, (newVal) => {
  authUser.value = newVal
}, { deep: true, immediate: true })

onMounted(() => {
  authStore.getAuthUser()
})
</script>

<template>
  <div
    v-if="modalStore.modal.applications && modalStore.modal.applications.length > 0"
    class="applications"
  >
    <div
      v-for="app in modalStore.modal.applications"
      :key="app.id"
      class="modal_application"
    >
      <div class="modal_application-title">
          {{ app.title }}
        <img
          v-if="app.user"
          class="modal_application-avatar"
          :src="app.user.avatar_url"
        >
      </div>
      <div
        v-if="app.description"
        class="modal_application-description"
      >
        {{ app.description }}
      </div>
      <div class="flex_row modal_application-bottom">
        <div class="flex_row">
          <div class="modal_application-date">
            {{ app.new_date }}
          </div>
          <div class="modal_application-date">
            {{ app.new_time }}
          </div>
        </div>
        <span
          v-if="authUser?.responses?.length
            && authUser?.responses.find(el => el.application_id === app.id)"
        >вы откликнулись</span>
        <button
          v-else
          @click="newResponse(app.id)"
        >
          откликнуться
        </button>
      </div>
    </div>
  </div>
</template>
