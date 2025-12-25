import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, form, next) => {
  const store = useAuthStore()

  const requiresAuth = to.meta.requiresAuth
  const isAuth = store.isAuthenticated

  if (requiresAuth && !isAuth) {
    next({ name: 'login' })
  }
  else {
    next()
  }
})

export default router
