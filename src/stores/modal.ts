import type { Component } from 'vue'
import type { ApplicationType, InterestTypeProfile, ResponseType, UserType } from '@/types'

interface ModalType {
  modal_content: Component | null
  title: string | null
  user: UserType | null
  application: ApplicationType | null
  applications: ApplicationType[] | null
}

export const useModalStore = defineStore('modal', () => {
  const modalActive = ref<boolean>(false)
  const modal = ref<ModalType>({
    modal_content: null,
    title: null,
    user: null,
    application: null,
    applications: null,
  })

  const responsesModal = ref<ResponseType[]>([])
  const interestsModal = ref<InterestTypeProfile[]>([])

  const openModal = (content: Component, title?: string | null, user?: UserType | null, application?: ApplicationType | null, applications?: ApplicationType[] | null) => {
    modalActive.value = true
    modal.value.modal_content = content
    if (title) {
      modal.value.title = title
    }
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

  const setResponses = (responses: ResponseType[]) =>{
    responsesModal.value = responses
  }

  const setInterests = (interests: InterestTypeProfile[]) => {
    interestsModal.value = interests
  }

  const closeModal = () => {
    modalActive.value = false
    modal.value.modal_content = null
    modal.value.title = null
    responsesModal.value = []
    interestsModal.value = []
  }

  return {
    modal,
    modalActive,
    responsesModal,
    interestsModal,
    openModal,
    closeModal,
    setResponses,
    setInterests
  }
})
