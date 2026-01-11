import type { Component } from 'vue'
import type { ApplicationType, UserType } from '@/types'

interface ModalType {
  modal_content: Component | null
  user: UserType | null
  application: ApplicationType | null
  applications: ApplicationType[] | null
}

export const useModalStore = defineStore('modal', () => {
  const modalActive = ref<boolean>(false)
  const modal = ref<ModalType>({
    modal_content: null,
    user: null,
    application: null,
    applications: null,
  })

  const openModal = (content: Component, user?: UserType | null, application?: ApplicationType | null, applications?: ApplicationType[] | null) => {
    modalActive.value = true
    modal.value.modal_content = content
    if (user) {
      modal.value.user = user
    }
    if (application) {
      modal.value.application = application
    }
    if (applications) {
      modal.value.applications = applications
    }
  }

  const closeModal = () => {
    modalActive.value = false
    modal.value.modal_content = null
  }

  return {
    modal,
    modalActive,
    openModal,
    closeModal,
  }
})
