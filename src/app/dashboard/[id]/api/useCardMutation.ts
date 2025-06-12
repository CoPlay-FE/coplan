import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Card, CardResponse } from '@/app/api/useCards'

import { updateCardColumn } from './updateCardColumn'

export const useCardMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // 1. 서버 API 호출
    // updateCardColumn 카드를 put해서 타겟 컬럼으로 카드 데이터를 수정함
    mutationFn: ({ cardId, columnId }: { cardId: number; columnId: number }) =>
      updateCardColumn(cardId, columnId),

    // 2. 낙관적 UI 처리 (서버 요청 전에 실행됨)
    // 타겟 컬럼에 드래그한 카드 추가하기
    onMutate: async ({ cardId, columnId }) => {
      // 취소해둠..왜하더라⭐️
      await queryClient.cancelQueries({ queryKey: ['columnId'] })
      // 업데이트 이전 데이터 챙겨뒀다가 롤백할때 사용
      // *['columnId', columnId]는 'columnId'라는 키 그룹 안에서 특정 columnId 값에 해당하는 캐시 데이터를 꺼낸다는 뜻 ...
      const previousData = queryClient.getQueryData<CardResponse>([
        'columnId',
        columnId,
      ])

      // 낙관적 업데이트(캐시 업데이트)
      // setQueryData 함수는 'columnId'라는 쿼리 키에 저장된 기존 데이터를 내부에서 꺼내서
      // 업데이트 함수의 인자 oldCards에 보내줌.
      // * CardResponse형을 저장해둬서, 원하는, 카드형 배열을 꺼내려면 cards까지 접근해야 함
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
      // 쿼리를 stale 상태로 바꿔(무효화) --> 관련 컴포넌트가 자동으로 refetch(재요청)
      queryClient.invalidateQueries({
        queryKey: ['columnId'],
      })
    },
  })
}
