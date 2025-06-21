import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

import { postCard } from './postCard'

// ✅ 카드 생성 모달에서 사용 (CreateCardForm.tsx)
export function usePostCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postCard,
    onSuccess: () => {
      toast.success('할 일이 추가되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['columnId'] }) //'columnId' 쿼리 invalidate - 카드 리스트가 stale 상태임을 알리고 다시 fetch 하도록 유도함
    },
    onError: (error) => {
      toast.error('카드 생성 실패')

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        console.error('카드 생성 실패:', message ?? '알 수 없는 에러')
      } else {
        console.error('카드 생성 실패:', error)
      }
    },
  })
}
