import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const isAuth = store.isAuthenticated

  if (!isAuth && (to.name === 'main')) {
    next({ name: 'login' })
    return
  }
  if (isAuth && (to.name === 'main')){
    next({ name: 'profile' })
    return
  }
  next()
})

export default router
