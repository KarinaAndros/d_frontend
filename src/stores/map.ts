import type { ApplicationType, InterestType } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

export interface MapUser {
  avatar?: string
  avatar_url?: string
  date?: string
  new_date?: string
  created_at: string
  email: string
  email_verified_at?: string
  active_applications?: ApplicationType[] | null
  interests?: InterestType[] | null
  id: number
  lat: number
  lng: number
  name: string
  surname: string
  updated_at: string
}

export const useMapStore = defineStore('map', () => {
  const users = ref<MapUser[]>([])
  async function fetchUsers() {
    try {
      const { data } = await api.get('/api/map/users')
      users.value = data
    }
    catch (e) {
      console.error('Ошибка загрузки пользователей карты', e)
    }
  }

  function handleUserMove(userData: MapUser) {
    const existingUser = users.value.find(u => u.id === userData.id)
    if (existingUser) {
      existingUser.lat = userData.lat
      existingUser.lng = userData.lng
    }
    else {
      users.value.push(userData)
    }
  }

  return { users, fetchUsers, handleUserMove }
})
