import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCard } from './deleteCard'

export function useDeleteCardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cardId: number) => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columnId'] }) // 카드 목록 캐시 무효화
    },
    onError: (error) => {
      console.error('카드 삭제 실패:', error)
    },
  })
}
