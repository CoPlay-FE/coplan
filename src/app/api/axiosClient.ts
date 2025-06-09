import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app',
})

// 작업용 임시 토큰
const TEMP_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTc4NiwidGVhbUlkIjoiNy02IiwiaWF0IjoxNzQ5MzEyOTI3LCJpc3MiOiJzcC10YXNraWZ5In0.JFrNYvsX_b5-yCMm-Nsmp56gaVwzJ7JfBqYirBR3qw0'

axiosClient.interceptors.request.use((config) => {
  if (TEMP_TOKEN) {
    config.headers['Authorization'] = `Bearer ${TEMP_TOKEN}`
  }

  return config
})

export default axiosClient
