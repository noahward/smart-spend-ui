import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthRoutes from './AuthRoutes'
import MainRoutes from './MainRoutes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/auth/Error.vue')
    },
    AuthRoutes,
    MainRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    auth.returnUrl = to.fullPath
    return next('/login')
  } else if (['/login', '/register'].includes(to.fullPath) && auth.isAuthenticated) {
    return next('/dashboard')
  } else {
    next()
  }
})
