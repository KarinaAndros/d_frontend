<script setup lang="ts">
import type { UserType } from '@/types'
import Edit from '@/components/Modals/users/edit.vue'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'

const store = useAuthStore()
const modalStore = useModalStore()
const authUser = ref<UserType>()

store.getAuthUser()

function editProfile() {
  modalStore.openModal(Edit, authUser.value)
}

watch(() => store.authUserData, () => {
  authUser.value = store.authUserData
}, { deep: true, immediate: true })
</script>

<template>
  <div class="home">
    <div
      v-if="authUser"
      class="profile"
    >
      <div class="profile_mainInf">
        <img
          class="profile_avatar"
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
        <button class="button">
          Создать заявку
        </button>
        <button
          class="button"
          @click="editProfile"
        >
          Редактировать профиль
        </button>
      </div>
      <button
        class="button"
        @click="editProfile"
      >
        Добавить увлечения
      </button>
    </div>
  </div>
</template>
