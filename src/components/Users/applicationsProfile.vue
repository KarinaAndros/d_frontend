<script setup lang="ts">
import type { ApplicationStatuses, ApplicationType } from '@/types'
import { storeToRefs } from 'pinia'
import { useApplicationStore } from '@/stores/applications'
import { useModalStore } from '@/stores/modal'
import ApplicationsEdit from '../Modals/users/applicationsEdit.vue'

// props
const props = defineProps<{
  applications: ApplicationType[]
  statuses?: ApplicationStatuses[]
}>()

// stores
const modalStore = useModalStore()
const applicationsStore = useApplicationStore()

// values
const activeTab = ref<number>(1)

const filteredApplications = computed(() => {
  if (!activeTab.value) {
    return props.applications
  }
  return props.applications.filter(
    application => application.status.id === activeTab.value
  )
})

// functions
function editApplications(app: ApplicationType) {
  modalStore.openModal(ApplicationsEdit, null, app)
}
function removeApplication(int: number) {
  applicationsStore.deleteApplication(int)
}
</script>

<template>
  Заявки:
  <div class="tabs flex_row">
    <div
      v-for="status in statuses"
      :key="status.id"
      class="tab"
      :class="{ 'tab-active': status.id === activeTab }"
      @click="activeTab = status.id"
    >
      {{ status.title }}
    </div>
  </div>
  <ul
    v-if="filteredApplications && filteredApplications.length > 0"
    class="profile_applications"
  >
    <li
      v-for="app in filteredApplications"
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

        <span
          @click="removeApplication(app.id)"
        >удалить</span>
        <span @click="editApplications(app)">редактировать</span>
    </li>
  </ul>

  <div v-else>
    Пока что пусто :(
  </div>
</template>
