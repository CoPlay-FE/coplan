import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { CommentsResponse } from '../type/Comment.type'

export async function fetchComments(cardId: number): Promise<CommentsResponse> {
  const res = await api.get<CommentsResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments?size=10&cardId=${cardId}`,
  )

  return res.data
}
