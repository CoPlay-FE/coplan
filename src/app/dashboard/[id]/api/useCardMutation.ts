import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Card, CardResponse } from '@/app/api/useCards'

import { useDragStore } from '../store/useDragStore'
import { updateCardColumn } from './updateCardColumn'

export const useCardMutation = () => {
  const queryClient = useQueryClient()
  const { clearDraggingCard } = useDragStore()

  return useMutation({
    // 1. 서버 API 호출
    // cardId: 드래그한 카드 아이디, columnId: dragOver된 타겟 컬럼 아이디
    mutationFn: ({ cardId, columnId }: { cardId: number; columnId: number }) =>
      updateCardColumn(cardId, columnId),

    // 2. 낙관적 UI 처리 (서버 요청 전에 실행됨)
    onMutate: async ({ cardId, columnId }) => {
      await queryClient.cancelQueries({ queryKey: ['columnId', columnId] })

      // 업데이트 이전 데이터 챙겨뒀다가 롤백할때 사용
      const previousData = queryClient.getQueryData<CardResponse>([
        'columnId',
        columnId,
      ])

      const currentCard = useDragStore.getState().draggingCard
      if (
        !currentCard ||
        currentCard.cardId !== cardId ||
        currentCard.columnId === columnId
      ) {
        console.log('no dragging card || is not a dragging card || same column')
        return
      }

      let extractedCard: Card | undefined // B. 에서 사용할 예정(추가할 카드 데이터는 Card여야 해서)
      // A. 이전 컬럼에서 카드 제거 & 카드 추출
      // setQueryData의 콜백함수의 리턴값이 쿼리키 캐시에 저장됨(캐시 업데이트)
      queryClient.setQueryData<CardResponse>(
        ['columnId', currentCard.columnId],
        (oldData) => {
          if (!oldData) return

          const filtered = oldData.cards.filter((card) => {
            if (card.id === cardId) extractedCard = card
            return card.id !== cardId
          })

          return { ...oldData, cards: filtered }
        },
      )
      // B. 새 컬럼에 카드 추가
      if (extractedCard) {
        queryClient.setQueryData<CardResponse>(
          ['columnId', columnId],
          (oldData) => {
            if (!oldData) return

            const movedCard = { ...extractedCard!, columnId }
            return {
              ...oldData,
              cards: [...oldData.cards, movedCard],
            }
          },
        )
      } else {
        console.log('카드가 제거 중에 undefined가 됨')
      }

      clearDraggingCard()
      return { previousData }
    },

    // 3. 에러 발생 시 롤백
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CardResponse>(
          ['columnId', variables.columnId],
          context.previousData,
        )
      }
      console.error('카드 이동 실패:', error)
    },

    // 4. 성공 시 서버 기준으로 다시 데이터 불러오도록 유도함.
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['columnId', variables.columnId],
      })
    },
  })
}
