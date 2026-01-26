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
      <div
        v-if="response.user"
        class="response-name"
      >
        {{ response.user.name }}
        <div

          v-if="response.status"
          class="response-status"
        >
          статус: {{ response.status.title }}
        </div>
      </div>

      <div
        v-if="response.status?.id === 3"
        class="response__buttons"
      >
        <span
          class="icon remove_response"
          @click="editStatus(response.id, 2)"
        >
          <img
            src="/icons/close.svg"
          >
        </span>
        <span
          class="icon agree_response"
          @click="editStatus(response.id, 1)"
        >
          <img
            src="/icons/check.svg"
          >
        </span>
      </div>
    </div>
  </div>
</template>
