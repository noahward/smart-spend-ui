import axios from 'axios'

const exchangeRateAPI = axios.create({
  baseURL: import.meta.env.VITE_EXCH_RATE_API_URL,
  headers: { 'X-Api-Key': import.meta.env.VITE_EXCH_RATE_API_SECRET_KEY }
})

if (import.meta.env.VITE_LOG_REQUESTS === 'true') {
  exchangeRateAPI.interceptors.request.use(request => {
    console.log(`Starting request to ${request.url}:`, request)
    return request
  })
}

export { exchangeRateAPI }
