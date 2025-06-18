import axios from 'axios'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

const authHttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

authHttpClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default authHttpClient
