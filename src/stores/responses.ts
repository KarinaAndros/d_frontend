import api from '@/api'
import { useAuthStore } from './auth'

export const useResponseStore = defineStore('responses', () => {
  const storeResponse = async (id_app: number) => {
    await api.post('/api/responses', {
      application_id: id_app,
      response_status_id: 3,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response)=>{
      if(response.status === 200){
        useAuthStore().getAuthUser()
      }
    })
  }
  return {
    storeResponse,
  }
})
