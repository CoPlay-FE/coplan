import authHttpClient from '@api/axios'

import { CommentResponse, PutCommentForm } from '../type/CommentFormData.type'

export async function putComment(
  payload: PutCommentForm,
  commentId: number,
): Promise<CommentResponse> {
  const res = await authHttpClient.put(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments/${commentId}`,
    payload,
  )
  return res.data
}
