import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { ApiResponse } from '../type/ApiResponse'

export async function deleteCard(cardId: number): Promise<ApiResponse> {
  const res = await api.delete(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards/${cardId}`,
  )
  return res.data
}
