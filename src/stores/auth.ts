import type { LngLat } from '@yandex/ymaps3-types'
import api from '@/api'
import router from '@/router'
import echo from '../../resources/js/echo'

export const useAuthStore = defineStore('auth', () => {
  /**
   * Interface for User
   */
  // interface User {
  //   id: number
  //   name: string
  //   surname?: string
  //   email: string
  //   email_verified_at: string
  //   created_at: string
  //   updated_at: string
  //   lat: number
  //   lng: number
  // }
  /**
   * Interface for User Response
   */
  interface UserResponse {
    user: {
      id: number
      name: string
      lat: number
      lng: number
    }
  }
  /**
   * Interface for Login values
   * @string email
   * @string password
   */
  interface LoginType {
    email: string
    password: string
  }
  const users = ref<UserResponse['user'][]>([])
  /**
   * Auth User
   */
  const authUser = ref(localStorage.getItem('user') || '')
  /**
   * Token for auth User
   */
  const token = ref(localStorage.getItem('auth_token') || '')

  const location = ref<LngLat>()

  /**
   * get coords for user
   */
  const getLocation = async () => {
    if (!navigator.geolocation) {
      console.error('Ваш браузер не поддерживает геолокацию')
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = String(position.coords.latitude)
        const lng = String(position.coords.longitude)
        const formData = new FormData()
        formData.append('lat', lat)
        formData.append('lng', lng)
        try {
          const response = await api.post('/api/user/location', formData)
          if (response.status === 200) {
            echo.channel('map')
              .listen('.UserAdded', (e: UserResponse) => {
                const mapUser: UserResponse['user'] = {
                  ...e.user,
                }
                users.value.push(mapUser)
              })
          }
        }
        catch (e) {
          console.error('Ошибка отправки координат', e)
        }
      },
      (error) => {
        console.error('Ошибка получения геопозиции:', error)
      },
      {
        enableHighAccuracy: true,
      },
    )
  }

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
        authUser.value = response.data.user
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('user', JSON.stringify(authUser.value))
        api.defaults.headers.common.Authorization = `Bearer ${token.value}`
        router.push('/map')
      }
      return response.data
    }
    catch (error: any) {
      console.error(error)
    }
  }

  const logout = async () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    // await api.get('/logout')
  }

  const isAuthenticated = computed(() => {
    return !!token.value && !!users.value
  })

  return {
    authUser,
    location,
    users,
    token,
    isAuthenticated,
    login,
    getLocation,
    logout,
  }
})
