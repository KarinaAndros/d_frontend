import { useAuthStore } from './auth'

export const useMenuStore = defineStore('menu', () => {
  interface MenuItemType {
    name: string
    link?: string
    action?: string
  }

  const menu = computed<MenuItemType[]>(() => {
    if (!useAuthStore().isAuthenticated) {
      return [
        { name: 'Регистрация', link: '/registration' },
        { name: 'Войти', link: '/login' },
      ]
    }
    else {
      return [
        { name: 'Профиль', link: '/profile' },
        { name: 'Карта', link: '/map' },
        { name: 'Выйти', action: 'logout' },
      ]
    }
  })

  return { menu }
})
