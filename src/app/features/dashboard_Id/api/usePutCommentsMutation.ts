import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { CommentResponse, PutCommentForm } from '../type/CommentFormData.type'
import { putComment } from './putComment'

interface PostCommentArgs {
  commentId: number
  payload: PutCommentForm
}

// ✅ 카드 생성 모달에서 사용 (CreateCardForm.tsx)
export function usePutCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation<CommentResponse, Error, PostCommentArgs>({
    mutationFn: ({ payload, commentId }) => putComment(payload, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }) //'columnId' 쿼리 invalidate - 카드가 stale 상태임을 알리고 다시 fetch 하도록 유도함
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        console.error('댓글 수정 실패:', message ?? '알 수 없는 에러')
      } else {
        console.error('댓글 수정 실패:', error)
      }
    },
  })
}
