import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { CardModifyFormData } from '../type/CardFormData.type'

interface ApiResponse {
  message: string
}

export async function putCard(
  payload: CardModifyFormData,
  cardId: number,
): Promise<ApiResponse> {
  const res = await api.put(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards/${cardId}`,
    payload,
  )
  return res.data
}
