import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { CommentResponse, PutCommentForm } from '../type/CommentFormData.type'

export async function putComment(
  payload: PutCommentForm,
  commentId: number,
): Promise<CommentResponse> {
  const res = await api.put(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments/${commentId}`,
    payload,
  )
  return res.data
}
