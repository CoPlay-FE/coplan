import axiosClient from '@/app/api/axiosClient'

import { CardResponse } from '../type/Card.type'

export async function fetchCards(
  columnId: number,
  size: number = 10,
): Promise<CardResponse> {
  const res = await axiosClient.get<CardResponse>(
    `/cards?size=${size}&columnId=${columnId}`,
  )
  return res.data
}
