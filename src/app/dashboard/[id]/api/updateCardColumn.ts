import axiosClient from '@/app/api/axiosClient'

// 카드 이동 - 해당 카드의 컬럼ID를 변경하는 방식(PUT)
export async function updateCardColumn(
  cardId: number,
  columnId: number,
): Promise<{ success: boolean }> {
  const res = await axiosClient.put<{ success: boolean }>(`/cards/${cardId}`, {
    columnId: columnId,
  })
  return res.data
}
