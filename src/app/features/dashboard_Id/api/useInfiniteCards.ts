// //size일단 10으로 하고, 나중에 커서아이디 받아서 무한 스크롤 구현해야 함.
// import { useQuery } from '@tanstack/react-query'

// import { CardResponse } from '../type/Card.type'
// import { fetchCards } from './fetchCards'

// export default function useCards(columnId: number) {
//   return useQuery<CardResponse>({
//     queryKey: ['columnId', columnId],
//     queryFn: () => fetchCards(columnId),
//   })
// }
import { useInfiniteQuery } from '@tanstack/react-query'

import { CardResponse } from '../type/Card.type'
import { fetchCards } from './fetchCards'

export function useInfiniteCards(columnId: number) {
  return useInfiniteQuery<CardResponse>({
    queryKey: ['cards', columnId],
    queryFn: ({ pageParam = null }) =>
      fetchCards({ columnId, cursorId: pageParam as number }),
    getNextPageParam: (lastPage) => {
      // 마지막 카드의 id를 다음 cursor로 사용
      return lastPage.cards.length === 0 ? undefined : lastPage.cursorId
    },
    initialPageParam: null,
  })
}
