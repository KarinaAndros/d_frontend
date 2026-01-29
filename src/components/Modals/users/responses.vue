<script setup lang="ts">
import api from '@/api'
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()

const { responsesModal } = storeToRefs(modalStore)

async function editStatus(id: number, status: number) {
  await api.put(`/api/responses/${id}`, { response_status_id: status }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log(response.data)
      responsesModal.value = response.data.responses
    }
  })
}
</script>

<template>
  <div
    v-if="responsesModal && responsesModal.length > 0"
    class="responses"
  >
    <div
      v-for="(response, index) in responsesModal"
      :key="index"
      class="response"
    >
      <div class="profile_application-title">
        {{ response.user.name }}
        <div

          v-if="response.status"
          class="response-status"
        >
          статус: {{ response.status.title }}
        </div>
      </div>

      <div>
        статус: {{ response.status.title }}
      </div>
    </div>
  </div>
</template>
