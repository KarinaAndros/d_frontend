import { useAuthStore } from './auth'

export const useMenuStore = defineStore('menu', () => {
  interface MenuItemType {
    name: string
    link?: string
    action?: string
  }

  const authStore = useAuthStore()

  const menu = ref<MenuItemType[]>()

  if (!authStore.isAuthenticated) {
    menu.value
      = [
        {
          name: 'Регистрация',
          link: '/registration',
        },
        {
          name: 'Войти',
          link: '/login',
        },

      ]
  }
  else {
    menu.value
      = [
        {
          name: 'Профиль',
          link: '/profile',
        },
        {
          name: 'Карта',
          link: '/map',
        },
        {
          name: 'Выйти',
          action: 'logout',
        },

      ]
  }

  return { menu }
})
