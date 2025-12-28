import type { Component } from 'vue'
import type { UserType } from '@/types'

interface ModalType {
  modal_content: Component | null
  user: UserType | null
}

export const useModalStore = defineStore('modal', () => {
  const modalActive = ref<boolean>(false)
  const modal = ref<ModalType>({
    modal_content: null,
    user: null,
  })

  const openModal = (content: Component, user?: UserType) => {
    modalActive.value = true
    modal.value.modal_content = content
    if (user) {
      modal.value.user = user
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
