import authHttpClient from '@/app/shared/lib/axios'

import { CardFormData } from '../type/CardFormData.type'

interface ApiResponse {
  message: string
}

export async function postCard(payload: CardFormData): Promise<ApiResponse> {
  const res = await authHttpClient.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards`,
    payload,
  )
  return res.data
}
