import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { CardModifyFormData } from '../type/CardFormData.type'
import { postCard } from './postCard'
import { putCard } from './putCard'

// ✅ 카드 수정 모달에서 사용 (CreateCardForm.tsx)
export function usePutCardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      cardId,
      payload,
    }: {
      cardId: number
      payload: CardModifyFormData
    }) => putCard(payload, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columnId'] }) //'columnId' 쿼리 invalidate - 카드가 stale 상태임을 알리고 다시 fetch 하도록 유도함
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        console.error('카드 수정 실패:', message ?? '알 수 없는 에러')
      } else {
        console.error('카드 수정 실패:', error)
      }
    },
  })
}
