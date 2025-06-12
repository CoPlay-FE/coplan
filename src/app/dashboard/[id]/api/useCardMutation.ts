import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CardResponse } from '@/app/api/useCards'

import { updateCardColumn } from './updateCardColumn'

export const useCardMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // 1. 서버 API 호출
    mutationFn: ({ cardId, columnId }: { cardId: number; columnId: number }) =>
      updateCardColumn(cardId, columnId),

    // 2. 낙관적 UI 처리 (서버 요청 전에 실행됨)
    onMutate: async ({ cardId, columnId }) => {
      await queryClient.cancelQueries({ queryKey: ['columnId'] })

      // 업데이트 이전 데이터 챙겨뒀다가 롤백할때 사용
      const previousData = queryClient.getQueryData<CardResponse>([
        'columnId',
        columnId,
      ])

      // 낙관적 업데이트(캐시 업데이트)
      queryClient.setQueryData<CardResponse>(
        ['columnId', columnId],
        (oldCards) => {
          if (!oldCards) return undefined
          return {
            ...oldCards,
            cards: oldCards.cards.map((card) =>
              card.id === cardId ? { ...card, columnId: columnId } : card,
            ),
          }
        },
      )

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['columnId'],
      })
    },
  })
}
