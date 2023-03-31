import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from './AuthRoutes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    AuthRoutes
  ]
})
