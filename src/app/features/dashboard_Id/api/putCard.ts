import authHttpClient from '@api/axios'

import { ApiResponse } from '../type/ApiResponse'
import { CardModifyFormData } from '../type/CardFormData.type'

export async function putCard(
  payload: CardModifyFormData,
  cardId: number,
): Promise<ApiResponse> {
  const res = await authHttpClient.put(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards/${cardId}`,
    payload,
  )
  return res.data
}
