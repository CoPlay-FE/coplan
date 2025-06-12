import axiosClient from '@/app/api/axiosClient'

// 카드 이동 - 해당 카드의 컬럼ID를 변경하는 방식(PUT)
export async function updateCardColumn(
  cardId: number,
  columnId: number,
): Promise<{ success: boolean }> {
  const res = await axiosClient.put<{ success: boolean }>(`/cards/${cardId}`, {
    columnId: columnId, // 키랑 밸류가 일치할떄는 축약해서 column으로 작성해도 무방함.
  })
  return res.data
}
