import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { CardFormData } from '../type/CardFormData.type'

interface ApiResponse {
  message: string
}

export async function postCard(payload: CardFormData): Promise<ApiResponse> {
  const res = await api.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards`,
    payload,
  )
  return res.data
}
