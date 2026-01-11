<script setup lang="ts">
import type { ApplicationStatuses, ApplicationType, InterestCategories, InterestTypeProfile, UserType } from '@/types'
import Applications from '@/components/Modals/users/applications.vue'
import Edit from '@/components/Modals/users/edit.vue'
import { useApplicationStore } from '@/stores/applications'
import { useAuthStore } from '@/stores/auth'
import { useInterestStore } from '@/stores/interests'
import { useModalStore } from '@/stores/modal'

// stores
const authStore = useAuthStore()
const modalStore = useModalStore()
const interestsStore = useInterestStore()
const applicationsStore = useApplicationStore()

// values
const authUser = ref<UserType | null>()
const interests = ref<InterestTypeProfile[]>()
const applications = ref<ApplicationType[]>()
const categories = ref<InterestCategories[]>()
const statuses = ref<ApplicationStatuses[]>()

// function from stores
authStore.getAuthUser()
interestsStore.getInterests()
applicationsStore.getApplications()
applicationsStore.getApplicationsStatuses()
interestsStore.getInterestsCategories()

// functions
function editProfile() {
  modalStore.openModal(Edit, authUser.value)
}

function addApplications() {
  modalStore.openModal(Applications)
}

// watches
watch(() => authStore.authUserData, (newVal) => {
  authUser.value = newVal
}, { deep: true, immediate: true })

watch(() => interestsStore.interestsUser, (newVal) => {
  interests.value = newVal
}, { deep: true, immediate: true })

watch(() => applicationsStore.applicationsUser, (newVal) => {
  applications.value = newVal
}, { deep: true, immediate: true })

watch(() => applicationsStore.statuses, (newVal) => {
  statuses.value = newVal
}, { deep: true, immediate: true })

watch(() => interestsStore.interestsCategories, (newVal) => {
  categories.value = newVal
}, { deep: true, immediate: true })
</script>

<template>
  <div
    v-if="authUser"
    class="home container profile_page"
  >
    <div

      class="profile"
    >
      <div class="profile_mainInf">
        <img
          v-if="authUser?.avatar_url"
          class="profile_avatar"
          loading="lazy"
          :src="authUser?.avatar_url"
        >
        <div class="profile_name">
          {{ authUser.name }} {{ authUser?.surname }}
        </div>
        <div
          v-if="authUser.new_date"
          class="profile_birth"
        >
          {{ authUser.new_date }}
        </div>
      </div>
      <div class="profile_buttons">
        <button
          class="button"
          @click="addApplications"
        >
          Создать заявку
        </button>
        <button
          class="button"
          @click="editProfile"
        >
          Редактировать профиль
        </button>
      </div>
    </div>

    <div
      class="profile"
    >
      <InterestsProfile
        :interests="interests"
        :categories="categories"
      />
    </div>
    <div class="profile applications">
      <ApplicationsProfile
        :applications="applications"
        :statuses="statuses"
      />
    </div>
  </div>
</template>
