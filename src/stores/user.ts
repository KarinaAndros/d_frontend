import api from '@/api'
import router from '@/router'
import { useAuthStore } from './auth'
import { useModalStore } from './modal'

export const useUserStore = defineStore('user', () => {
  // interface EditUserData {
  //   name: string
  //   surname: string | null
  //   date: string | null
  //   avatar?: File | null
  // }

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
