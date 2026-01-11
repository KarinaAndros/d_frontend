import type { InterestTypeProfile } from '../types/index'
import type { InterestCategories, InterestType } from '@/types'
import api from '@/api'
import { useModalStore } from './modal'

export const useInterestStore = defineStore('interest', () => {
  const interestsCategories = ref<InterestCategories[]>()

  const interestsUser = ref<InterestTypeProfile[]>()

  const getInterestsCategories = async () => {
    await api.get('/api/interests-categories').then((response) => {
      if (response.status === 200) {
        interestsCategories.value = response.data
      }
    })
  }

  const getInterests = async () => {
    await api.get('/api/user/interests', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        interestsUser.value = response.data
      }
    })
  }

  const storeInterest = async (values: InterestType) => {
    await api.post('/api/interests', values).then((response) => {
      if (response.status === 200) {
        getInterests()
        useModalStore().closeModal()
      }
    })
  }

  const deleteInterest = async (int: number) => {
    await api.delete(`/api/interests/${int}`).then((response) => {
      if (response.status === 200) {
        getInterests()
      }
    })
  }

  return {
    interestsCategories,
    interestsUser,
    getInterestsCategories,
    storeInterest,
    getInterests,
    deleteInterest,
  }
})
