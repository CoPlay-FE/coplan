import { useInfiniteQuery } from '@tanstack/react-query'

import { CommentsResponse } from '../type/Comment.type'
import { fetchComments } from './fetchComments'

export function useInfiniteComments(cardId: number) {
  return useInfiniteQuery<CommentsResponse>({
    queryKey: ['comments', cardId],
    queryFn: ({ pageParam = null }) =>
      fetchComments({ cardId, cursorId: pageParam as number }),
    getNextPageParam: (lastPage) => {
      // 마지막 카드의 id를 다음 cursor로 사용
      return lastPage.comments.length === 0 ? undefined : lastPage.cursorId
    },
    initialPageParam: null,
  })
}
