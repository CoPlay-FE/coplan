import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { CardResponse } from '../type/Card.type'

export async function fetchCards(
  columnId: number,
  size: number = 10,
): Promise<CardResponse> {
  const res = await api.get<CardResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards?size=${size}&columnId=${columnId}`,
  )
  return res.data
}
