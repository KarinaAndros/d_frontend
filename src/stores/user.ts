import api from '@/api'
import { useAuthStore } from './auth'
import { useModalStore } from './modal'

export const useUserStore = defineStore('user', () => {
  const editUserData = async (values: FormData) => {
    await api.post(`/api/users/update`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.status === 200) {
        useAuthStore().getAuthUser()
        useModalStore().closeModal()
      }
    })
  }
  return {
    editUserData,
  }
})
