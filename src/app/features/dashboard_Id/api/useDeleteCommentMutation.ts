import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteComment } from './deleteComment'

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }) // 댓글 리스트 캐시 무효화
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error)
    },
  })
}
