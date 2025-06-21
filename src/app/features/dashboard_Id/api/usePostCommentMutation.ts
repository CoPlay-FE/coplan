import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { postComment } from './postComment'

// ✅ 댓글 생성 컴포넌트에서 사용 (CommentForm.tsx)
export function usePostCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }) // 댓글 목록 캐시가 stale 상태임을 알리고 다시 fetch 하도록 유도함
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        console.error('댓글 생성 실패:', message ?? '알 수 없는 에러')
      } else {
        console.error('댓글 생성 실패:', error)
      }
    },
  })
}
