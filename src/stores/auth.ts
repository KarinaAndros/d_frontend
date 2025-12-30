import type { LngLat } from '@yandex/ymaps3-types'
import type { UserType } from '@/types'
import api from '@/api'
import router from '@/router'
import echo from '../../resources/js/echo'

export const useAuthStore = defineStore('auth', () => {
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
  /**
   * Interface for Registration values
   * @string email
   * @string password
   */
  interface RegType {
    name: string
    surname?: string | null
    email: string
    password: string
    password_confirmation: string
    agree: boolean
  }
  const users = ref<UserResponse['user'][]>([])

  const messageError = ref<string>()
  /**
   * Auth User
   */
  const authUser = ref(localStorage.getItem('user') || '')
  const authUserData = ref<UserType>()
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
   * Registration User
   */
  const registration = async (values: RegType) => {
    try {
      const response = await api.post('api/users', values)
      if (response.data.token) {
        token.value = response.data.token
        authUser.value = response.data.user
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('user', JSON.stringify(authUser.value))
        api.defaults.headers.common.Authorization = `Bearer ${token.value}`
        router.push('/profile')
      }
      return response.data
    }
    catch (error: any) {
      console.error(error)
    }
  }

  /**
   * Login User
   */
  const login = async (values: LoginType) => {
    try {
      const response = await api.post('/api/login', values)
      if (response.data.token) {
        token.value = response.data.token
        authUser.value = response.data.user
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('user', JSON.stringify(authUser.value))
        api.defaults.headers.common.Authorization = `Bearer ${token.value}`
        router.push('/profile')
      }
      return response.data
    }
    catch (error: any) {
      if (error.response.status === 401) {
        messageError.value = error.response.data.message
      }
    }
  }

  const logout = async () => {
    await api.post('/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token') }`,
      },
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        router.push('/login')
      }
    })
  }

  const isAuthenticated = computed(() => {
    return !!token.value && !!users.value
  })

  const getAuthUser = async () => {
    await api.get('/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
      .then((response) => {
        authUserData.value = response.data
      })
      .catch((error) => {
        console.error('Ошибка авторизации:', error)
      })
  }

  return {
    authUser,
    authUserData,
    location,
    users,
    token,
    messageError,
    isAuthenticated,
    login,
    registration,
    getLocation,
    logout,
    getAuthUser,
  }
})
