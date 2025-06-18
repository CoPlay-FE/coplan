import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postCard } from './postCard'

export function usePostCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postCard,
    onSuccess: () => {
      //'cards' 쿼리 invalidate
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
    onError: (error) => {
      console.error('카드 생성 실패:', error)
    },
  })
}
