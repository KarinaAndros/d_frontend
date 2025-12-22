export const useMenuStore = defineStore('menu', () => {
  interface MenuItemType {
    name: string
    link: string
  }

  const menu = ref<MenuItemType[]>(
    [
      {
        name: 'Главная',
        link: '/',
      },
      {
        name: 'Регистрация',
        link: '/registration',
      },
      {
        name: 'Войти',
        link: '/login',
      },

    ],
  )

  return { menu }
})
