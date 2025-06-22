import { useInfiniteQuery } from '@tanstack/react-query'

import { CardResponse } from '../type/Card.type'
import { fetchCards } from './fetchCards'

export function useInfiniteCards(columnId: number) {
  return useInfiniteQuery<CardResponse>({
    queryKey: ['columnId', columnId],
    queryFn: ({ pageParam = null }) =>
      fetchCards({ columnId, cursorId: pageParam as number }),
    getNextPageParam: (lastPage) => {
      // 마지막 카드의 id를 다음 cursor로 사용
      return lastPage.cards.length === 0 ? undefined : lastPage.cursorId
    },
    initialPageParam: null,
  })
}
