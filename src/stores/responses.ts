import api from '@/api'

export const useResponseStore = defineStore('responses', () => {
  const storeResponse = async (id_app: number) => {
    await api.post('/api/responses', {
      application_id: id_app,
      response_status_id: 3,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
  }
  return {
    storeResponse,
  }
})
