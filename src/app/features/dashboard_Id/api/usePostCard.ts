import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { postCard } from './postCard'

export function usePostCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postCard,
    onSuccess: () => {
      //'cards' 쿼리 invalidate - 카드 리스트가 stale 상태임을 알리고 다시 fetch 하도록 유도함
      queryClient.invalidateQueries({ queryKey: ['columnId'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        console.error('카드 생성 실패:', message ?? '알 수 없는 에러')
      } else {
        console.error('카드 생성 실패:', error)
      }
    },
  })
}
