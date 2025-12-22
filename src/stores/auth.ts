import type { LngLat } from '@yandex/ymaps3-types'
import api from '@/api'
import router from '@/router'
import echo from '../../resources/js/echo'

export const useAuthStore = defineStore('auth', () => {
  /**
   * Interface for User
   */
  interface User {
    id?: number | null
    name?: string | null
    surname?: string | null
    email?: string | null
    email_verified_at?: string | null
    created_at?: string | null
    updated_at?: string | null
  }
  /**
   * Interface for Login values
   * @string email
   * @string password
   */
  interface LoginType {
    email?: string
    password?: string
    lat?: number
    lng?: number
  }
  const users = ref<User[] | []>([])
  /**
   * Auth User
   */
  const user = ref<User | null>(null)
  /**
   * Token for auth User
   */
  const token = ref<string | ''>('')

  /**
   * Init CSRF
   */
  const initCSRF = async () => {
    try {
      await api.get('/sanctum/csrf-cookie', {
        withCredentials: true,
      })
    }
    catch (error) {
      console.error('CSRF initialization failed:', error)
    }
  }
  /**
   * Login User
   */
  const login = async (values: LoginType) => {
    try {
      initCSRF()
      const response = await api.post('/login', values)
      if (response.data.token) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
        api.defaults.headers.common.Authorization = `Bearer ${token.value}`
        echo.channel('map')
          .listen('.UserAdded', (e) => {
            const mapUser = {
              ...e.user,
            }
            users.value.push(mapUser)
          })
        router.push('/map')
      }
      return response.data
    }
    catch (error: any) {
      console.error(error)
    }
  }

  return { user, users, token, login }
})
