import authHttpClient from '@lib/axios'

// 카드 이동 - 해당 카드의 컬럼ID를 변경하는 방식(PUT)
export async function updateCardColumn(
  cardId: number,
  columnId: number,
): Promise<{ success: boolean }> {
  const res = await authHttpClient.put<{ success: boolean }>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards/${cardId}`,
    {
      columnId: columnId,
    },
  )
  return res.data
}
