import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteCard } from './deleteCard'

export function useDeleteCardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cardId: number) => deleteCard(cardId),
    onSuccess: () => {
      toast.success('카드가 삭제되었습니다')
      queryClient.invalidateQueries({ queryKey: ['columnId'] }) // 카드 목록 캐시 무효화
    },
    onError: (error) => {
      toast.error('카드 삭제를 실패했습니다.')
      console.error('카드 삭제 실패:', error)
    },
  })
}
