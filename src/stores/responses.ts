import api from '@/api'
import { useApplicationStore } from './applications'
import { useAuthStore } from './auth'
import type { ResponseType } from '@/types'

export const useResponseStore = defineStore('responses', () => {
  const storeResponse = async (id_app: number) => {
    await api.post('/api/responses', {
      application_id: id_app,
      response_status_id: 3,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        useAuthStore().getAuthUser()
      }
    })
  }

  const editStatus = async (id: number, status: number) => {
    await api.put(`/api/responses/${id}`, { response_status_id: status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.data.find((element: ResponseType) => 
          element.id === id
      );
      }
    })
  }

  return {
    storeResponse,
    editStatus,
  }
})
