import axios from 'axios'
import { useAuthStore } from '@/app/features/auth/store/auth-store'
import { AUTH_ENDPOINT } from '@/app/features/auth/api/auth-endpoint'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    const publicPaths = [AUTH_ENDPOINT.LOGIN, AUTH_ENDPOINT.SIGNUP]

    if (!publicPaths.includes(config.url || '') && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
