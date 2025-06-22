import authHttpClient from '@/app/shared/lib/axios'

import { CardResponse } from '../type/Card.type'

export async function fetchCards({
  columnId,
  size = 6,
  cursorId,
}: {
  columnId: number
  size?: number
  cursorId?: number | null
}): Promise<CardResponse> {
  const res = await authHttpClient.get<CardResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards`,
    {
      params: {
        columnId,
        size,
        ...(cursorId ? { cursorId } : {}), // 첫 페이지는 cursor 생략
      },
    },
  )
  return res.data
}
