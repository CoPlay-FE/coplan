import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/',
})

// 작업용 임시 토큰
const TEMP_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

api.interceptors.request.use((config) => {
  if (TEMP_TOKEN) {
    config.headers['Authorization'] = `Bearer ${TEMP_TOKEN}`
  }

  return config
})

export default api
