import axios from 'axios'
import { useAuthStore } from '@/app/features/auth/store/useAuthStore'
import { AUTH_ENDPOINT } from '@/app/features/auth/api/authEndpoint'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    const publicPaths = [AUTH_ENDPOINT.LOGIN, AUTH_ENDPOINT.SIGNUP]
    const isPulicPath = publicPaths.some((path) => config.url?.includes(path))

    if (!isPulicPath && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
