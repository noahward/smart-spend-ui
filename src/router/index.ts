import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthRoutes from './AuthRoutes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    AuthRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.isAuthenticated) {
      auth.returnUrl = to.fullPath
      return next('/auth/login')
    } else next()
  } else {
    next()
  }
})
