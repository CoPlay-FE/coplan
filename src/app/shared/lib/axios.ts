import axios from 'axios'
import { useAuthStore } from '@/app/features/auth/store/auth-store'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    const publicPaths = ['/15-2/auth/login', '/15-2/users']

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
