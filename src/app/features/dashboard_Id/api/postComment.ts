import authHttpClient from '@/app/shared/lib/axios'

import { CommentResponse, PutCommentForm } from '../type/CommentFormData.type'

export async function postComment(
  payload: PutCommentForm,
): Promise<CommentResponse> {
  const res = await authHttpClient.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments`,
    payload,
  )
  return res.data
}
