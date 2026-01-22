<script setup lang="ts">
import type { ApplicationStatuses, ApplicationType, ResponseType } from '@/types'
import { useApplicationStore } from '@/stores/applications'
import { useModalStore } from '@/stores/modal'
import ApplicationsEdit from '../Modals/users/applicationsEdit.vue'
import Responses from '../Modals/users/responses.vue'

// props
defineProps<{
  applications?: ApplicationType[]
  statuses?: ApplicationStatuses[]
}>()

// stores
const modalStore = useModalStore()
const applicationsStore = useApplicationStore()

// functions
function editApplications(app: ApplicationType) {
  modalStore.openModal(ApplicationsEdit, "Редактирование заявки", null, app)
}
function removeApplication(int: number) {
  applicationsStore.deleteApplication(int)
}
function allResponses(val: ResponseType[]) {
  modalStore.setResponses(val)
  modalStore.openModal(Responses)
}
</script>

<template>
  <div
    v-if="applications && applications.length > 0"
    class="profile_applications"
  >
    <div
      v-for="app in applications"
      :key="app.id"
      class="profile_application"
    >
      <span
        v-if="app.responses && app.responses.length > 0"
        class="profile_application-responses"
        @click="allResponses(app.responses)"
      >{{ app.responses.length }}</span>
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
      <div class="profile_application-title">
        {{ app.title }}
      </div>
      <div
        v-if="app.description"
        class="profile_application-description"
      >
        {{ app.description }}
      </div>
      <div class="flex_row application_buttom">
        <div class="applications_buttons">
          <span
            class="icon"
            @click="removeApplication(app.id)"
          > <img
            class="edit_icon"
            src="/icons/remove.svg"
          ></span>
          <span
            class="icon"
            @click="editApplications(app)"
          >
            <img
              class="edit_icon"
              src="/icons/edit.svg"
            >
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Пока что пусто :(
  </div>
</template>
