import axiosClient from './axiosClient'
import type { Card } from './useCards'

// PUT 요청 - 카드 전체 업데이트 (필요시)
export async function updateCard(
  cardId: number,
  cardData: Partial<Card>,
): Promise<Card> {
  const res = await axiosClient.put<Card>(`/cards/${cardId}`, cardData)
  return res.data
}
