import axios from 'axios'
import { router } from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.isAuthenticated) {
      config.headers.Authorization = `Token ${authStore.user.authToken}`
    }
    return config
  },
  error => { console.log('Error!'); return Promise.reject(error) }
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && router.currentRoute.value.meta.requiresAuth) {
      const authStore = useAuthStore()
      authStore.user = {}
      localStorage.removeItem('user')
      router.push('/login')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

if (import.meta.env.VITE_LOG_REQUESTS === 'true') {
  api.interceptors.request.use(request => {
    console.log(`Starting request to ${request.url}:`, request)
    return request
  })
}

export { api }
