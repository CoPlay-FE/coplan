import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { ApiResponse } from '../type/ApiResponse'

export async function deleteComment(commentId: number): Promise<ApiResponse> {
  const res = await api.delete(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/comments/${commentId}`,
  )
  return res.data
}
