import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

if (import.meta.env.VITE_LOG_REQUESTS === 'true') {
  api.interceptors.request.use(request => {
    console.log('Starting request:', request)
    return request
  })
}

export { api }
