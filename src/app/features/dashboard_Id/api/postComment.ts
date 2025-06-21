// import api from '@/app/shared/lib/axios'
import api from '@/app/shared/lib/testAxios'

import { CommentResponse, PutCommentForm } from '../type/CommentFormData.type'

export async function postComment(
  payload: PutCommentForm,
): Promise<CommentResponse> {
  const res = await api.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments`,
    payload,
  )
  return res.data
}
