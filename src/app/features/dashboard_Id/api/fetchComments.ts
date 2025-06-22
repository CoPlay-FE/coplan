import authHttpClient from '@/app/shared/lib/axios'

import { CommentsResponse } from '../type/Comment.type'

export async function fetchComments({
  cardId,
  size = 5,
  cursorId,
}: {
  cardId: number
  size?: number
  cursorId?: number | null
}): Promise<CommentsResponse> {
  const res = await authHttpClient.get<CommentsResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments`,
    {
      params: {
        size,
        ...(cursorId ? { cursorId } : {}), // 첫 페이지는 cursor 생략
        cardId,
      },
    },
  )
  return res.data
}
